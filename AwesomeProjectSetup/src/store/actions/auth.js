import { AsyncStorage } from 'react-native';
import {Navigation} from 'react-native-navigation';
import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading} from "./index";
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import authKey from '../../../authKey';
import App from '../../../App';

export const tryAuth = (authData, authMode) => { 
    return dispatch => {
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + authKey;
        dispatch(uiStartLoading());
        if(authMode === "signup"){
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + authKey;
        } 
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(uiStopLoading());
            alert("Authentication Failed!  Please try again.");
        })
        .then(res => res.json())
        .then(parsedRes => {
            dispatch(uiStopLoading());
            console.log(parsedRes);
            if(!parsedRes.idToken){
                alert("Authentication Failed!  Please try again.");
            } else {
                dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken));
                startMainTabs();
            }
        })
    }
};

export const authSetToken = token => {
    return {    
        type: AUTH_SET_TOKEN,
        token: token,
    }
}

export const authStoreToken = (token, expiresIn, refreshToken) => {
    return dispatch => {
        dispatch(authSetToken(token));
        const now = new Date();
        const expiryDate = now.getTime() + (expiresIn * 1000);
        AsyncStorage.setItem("ap:auth:token", token);  // can name token any string you want
        AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());  
        AsyncStorage.setItem("ap:auth:refreshToken", refreshToken);  
    }
}

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if(!token){
                let fetchedToken;
                AsyncStorage.getItem("ap:auth:token")
                    .catch(err => reject())
                    .then(tokenFromStorage => {
                        fetchedToken = tokenFromStorage;
                        if(!tokenFromStorage){
                            reject();
                            return;
                        }
                        return AsyncStorage.getItem("ap:auth:expiryDate");
                    })
                    .then(expiryDate => {
                        const parsedExpiryDate = new Date(parseInt(expiryDate));
                        const now = new Date();
                        if(parsedExpiryDate > now){
                            dispatch(authSetToken(fetchedToken));
                            resolve(fetchedToken);    
                        } else {
                            reject();
                        }
                    })
                    .catch(err =>  reject())
            } else {
                resolve(token);
            }
        });
        return promise
            .catch(err => {
            return AsyncStorage.getItem("ap:auth:refreshToken")
                .then(refreshToken => {
                    return fetch("https://securetoken.googleapis.com/v1/token?key="+ authKey, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: "grant_type=refresh_token&refresh_token="+refreshToken,
                    })
                })
                .then(res => res.json())
                .then(parsedRes => {
                    if(parsedRes.id_token){
                        console.log('refresh token saves the day!')
                        dispatch(authStoreToken(parsedRes.id_token, parsedRes.expires_in, parsedRes.refresh_token));
                        return parsedRes.id_token;  // need to return token so in autoSignin it will trigger startMainTabs()
                    } else {
                        dispatch(authClearStorage())
                    }
                })
            })
        .then(token => {
            if (!token) {
                throw (new Error());
            } else {
                return token;
            }
        })
    };
};

export const autoSignin = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                startMainTabs();
            })
            .catch(err => console.log("Failed to fetch token: ", err));
    }
}

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem("ap:auth:token");
        AsyncStorage.removeItem("ap:auth:expiryDate");    
        return AsyncStorage.removeItem("ap:auth:refreshToken");    
    }
}

export const authLogout = () => {
    console.log('authLogout action hit');
    return dispatch => {
        dispatch(authClearStorage())
            .then(() => {
                console.log('in then after clear storage in authLogout');
                Navigation.popToRoot(this.props.componentId);
            });
    }
}

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    };
};
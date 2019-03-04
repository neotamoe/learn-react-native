import { AsyncStorage } from 'react-native';

import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading} from "./index";
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import authKey from '../../../authKey';

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
                dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn));
                startMainTabs();
            }
        })
    }
};

export const authSetToken = token => {
    console.log('token in authSetToken: ', token);
    return {    
        type: AUTH_SET_TOKEN,
        token: token,
    }
}

export const authStoreToken = (token, expiresIn) => {
    return dispatch => {
        dispatch(authSetToken(token));
        const now = new Date();
        const expiryDate = now.getTime() + (expiresIn * 1000);
        AsyncStorage.setItem("ap:auth:token", token);  // can name token any string you want
        AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());  // can name token any string you want
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
        return promise;
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
import { TRY_AUTH } from './actionTypes';
import { uiStartLoading, uiStopLoading} from "./index";
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import authKey from '../../../authKey';

export const tryAuth = (authData) => { 
    return dispatch => {
        dispatch(authSignup(authData));
    }
};

export const authSignup = (authData) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + authKey, {
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
            if(parsedRes.error){
                alert("Authentication Failed!  Please try again.");
            } else {
                startMainTabs();
            }
            console.log(parsedRes);
        })
    }
}
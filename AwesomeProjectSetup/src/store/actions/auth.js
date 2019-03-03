import { TRY_AUTH } from './actionTypes';
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
            if(parsedRes.error){
                alert("Authentication Failed!  Please try again.");
            } else {
                startMainTabs();
            }
            console.log(parsedRes);
        })
    }
};
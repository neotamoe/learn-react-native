import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const addPlace = (placeName, location, image) => { 
    return dispatch => {
        let authToken;
        dispatch(uiStartLoading());
        dispatch(authGetToken())
        .catch(() => {
            alert("No valid token found!")
        })
        .then(token => {
            authToken = token;
            return fetch("https://us-central1-awesome-places-db.cloudfunctions.net/storeImage",{
                method: 'POST',
                body: JSON.stringify({
                    image: image.base64
                }),
                headers: {
                    "Authorization": "Bearer " + authToken
                }
            })    
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong; please try again.");
            dispatch(uiStopLoading());
        })
        .then(res => res.json())  // this only catches missing network connectivity errors; doesn't catch 4xx or 5xx errors
        .then(parsedRes => {
            const placeData = {
                name: placeName, 
                location: location,
                image: parsedRes.imageUrl
            };
            console.log('placeData', placeData);
            return fetch("https://awesome-places-db.firebaseio.com/places.json?auth="+authToken, {
                method: 'POST',
                body: JSON.stringify(placeData)
            });
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong; please try again.");
            dispatch(uiStopLoading());
        })
        .then(res => res.json())  // this is needed when using fetch
        .then(parsedRes => {
            dispatch(uiStopLoading());
        })
    }
};

export const deletePlace = (key) => { 
    return dispatch => {
        dispatch(authGetToken())
            .catch(() => {
                alert("No valid token found!")
            })
            .then(token => {
                dispatch(removePlace(key));
                return fetch("https://awesome-places-db.firebaseio.com/places/"+key+".json?auth="+token, {
                    method: 'DELETE'
                })
            })            
            .then(res => res.json())  // this only catches missing network connectivity errors; doesn't catch 4xx or 5xx errors
            .then(parsedRes => {
                console.log("Done!");  
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong; please try again.");
            })
    }
};

export const getPlaces = () => { 
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                return fetch("https://awesome-places-db.firebaseio.com/places.json?auth="+token)
            })
            .catch(() => {
                alert("No valid token found!")
            })
            .then(res => res.json())
            .then(parsedRes => {
                const places = [];
                for (let key in parsedRes) {
                    places.push({
                        ...parsedRes[key],
                        image: {
                            uri: parsedRes[key].image
                        },
                        key: key
                    })
                }
                dispatch(setPlaces(places))
            })
            .catch(err => {
                alert("Something went wrong, sorry!");
                console.log(err);
            })
    }
};

export const setPlaces = places => {
    return {
        places: places,
        type: SET_PLACES
    }
}

export const removePlace = key => {
    return {
        key: key,
        type: REMOVE_PLACE
    }
}
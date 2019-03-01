import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (placeName, location, image) => { 
    return dispatch => {
        console.log('image in addPlace: ', image);  // this is ok
        // return fetch("https://console.firebase.google.com/project/awesome-places-db/overview",{
        return fetch("https://us-central1-awesome-places-db.cloudfunctions.net/storeImage",{
            method: 'POST',
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            const placeData = {
                name: placeName, 
                location: location,
                image: parsedRes.imageUrl
            };
            return fetch("https://awesome-places-db.firebaseio.com/places.json", {
                method: 'POST',
                body: JSON.stringify(placeData)
            });
        })
        .catch(err => console.log(err))
        .then(res => res.json())  // this is needed when using fetch
        .then(parsedRes => {
            console.log(parsedRes)
        })
    }
};

export const deletePlace = (key) => { 
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};
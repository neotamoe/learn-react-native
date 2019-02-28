import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (placeName, location, image) => { 
    return dispatch => {
        const placeData = {
            name: placeName, 
            location: location
        }
        fetch("https://awesome-places-db.firebaseio.com/places.json", {
            method: 'POST',
            body: JSON.stringify(placeData)
        })
        .catch(err => console.log(err))
        .then(res => res.json())  // this is needed when using fetch
        .then(parsedRes => {
            console.log(parsedRes)
        })
    }
    // return {
    //     type: ADD_PLACE,
    //     placeName: placeName,
    //     location: location,
    //     image: image
    // };
};

export const deletePlace = (key) => { 
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};
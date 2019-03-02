import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';

export const addPlace = (placeName, location, image) => { 
    return dispatch => {
        dispatch(uiStartLoading());
        return fetch("https://us-central1-awesome-places-db.cloudfunctions.net/storeImage",{
            method: 'POST',
            body: JSON.stringify({
                image: image.base64
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
            return fetch("https://awesome-places-db.firebaseio.com/places.json", {
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
        dispatch(removePlace(key));
        return fetch("https://awesome-places-db.firebaseio.com/places/"+key+".json", {
            method: 'DELETE'
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong; please try again.");
        })
        .then(res => res.json())  // this only catches missing network connectivity errors; doesn't catch 4xx or 5xx errors
        .then(parsedRes => {
            console.log("Done!");  
        })
    }
};

export const getPlaces = () => { 
    return dispatch => {
        fetch("https://awesome-places-db.firebaseio.com/places.json")
        .catch(err => {
            alert("Something went wrong, sorry!");
            console.log(err);
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
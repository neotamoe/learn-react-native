import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes';

const initialState = {
    places: [],
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_PLACE: 
            return {
                ...state,
                places: state.places.concat({
                    key: Math.random().toString(), 
                    name: action.placeName,
                    image: {
                        uri: "https://cdn.pixabay.com/photo/2016/07/06/03/48/minneapolis-1499809_960_720.jpg"
                    },
                    location: action.location
                })
            };
        case DELETE_PLACE: 
            return {
                ...state,
                places: state.places.filter((place) => {
                    return place.key !== action.placeKey;
                  }),
                };
        default:
            return state;
    }

}; 

export default reducer;
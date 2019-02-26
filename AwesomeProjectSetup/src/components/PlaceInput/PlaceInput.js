import React from 'react';

import DefaultInput from '../UI/DefaultInput/DefaultInput';

const placeInput = props => {
    return (
        <DefaultInput 
            placeholder="Place Name" 
            valid={props.placeData.valid}
            value={props.placeData.value}
            touched={props.placeData.touched} 
            onChangeText={props.onChangeText}/>
    )
};

export default placeInput;
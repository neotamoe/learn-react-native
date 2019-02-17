import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { connect } from 'react-redux';

import InputAndButton from '../../components/InputAndButton/InputAndButton';
import {addPlace} from '../../store/actions/index';

class SharePlaceScreen extends Component {
    placeAddedHandler = placeName => {
        this.props.onAddPlace(placeName);
    }

    render() {
        return (
            <View>
                <InputAndButton onPlaceAdded={this.placeAddedHandler}/>
            </View>
        );
    }
};

const mapStateToProps = {

}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    }
}

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
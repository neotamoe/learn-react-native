import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { connect } from 'react-redux';
import {Navigation} from 'react-native-navigation';

import InputAndButton from '../../components/InputAndButton/InputAndButton';
import {addPlace} from '../../store/actions/index';

class SharePlaceScreen extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    placeAddedHandler = placeName => {
        this.props.onAddPlace(placeName);
    }

    navigationButtonPressed({ buttonId }) {
        if(buttonId === 'sideDrawerButton'){
            (!this.isSideDrawerVisible) ? this.isSideDrawerVisible = true : this.isSideDrawerVisible = false
            Navigation.mergeOptions(this.props.componentId, {
                sideMenu: {
                    left: {
                        visible: this.isSideDrawerVisible,
                    }
                }
            });
        }
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
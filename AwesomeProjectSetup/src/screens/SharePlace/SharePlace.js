import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, ScrollView, Image} from 'react-native';
import { connect } from 'react-redux';
import {Navigation} from 'react-native-navigation';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';

import {addPlace} from '../../store/actions/index';

class SharePlaceScreen extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    state = {
        placeName: ""
    }

    placeAddedHandler = () => {
        if(this.state.placeName.trim()!==""){
            this.props.onAddPlace(this.state.placeName);
        }
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

    placeNameChangedHandler = val => {
        this.setState({
            placeName: val
        })
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Share a Place With Us!</HeadingText>
                    </MainText>
                    <PickImage />
                    <PickLocation />
                    <PlaceInput placeName={this.state.placeName} onChangeText={this.placeNameChangedHandler}/>
                    <View style={styles.button}>
                        <Button title="Share Place!" onPress={this.placeAddedHandler}/>
                    </View>
                </View>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    placeholder: { 
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: "80%",
        height: 150
    },
    button: {
        margin: 8
    },
    imagePreview: {
        width: '100%',
        height: '100%'
    }
});

const mapStateToProps = {

}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    }
}

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
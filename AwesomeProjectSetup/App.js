/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';

import List from './src/components/List/List';
import InputAndButton from './src/components/InputAndButton/InputAndButton';
import placeImage from './src/assets/walker-art-center.jpg';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    placeName: '',
    places: [],
    selectedPlace: null
  }
  placeNameChangedHandler = (val) => {
    this.setState({
      placeName: val
    })
  }
  placeSubmitHandler = () => {
    if(this.state.placeName === ""){
      return;
    }
    this.setState((prevState) => {
      return {
        places: prevState.places.concat({
          key: Math.random(), 
          name: this.state.placeName,
          image: placeImage
          // image: {
          //   uri: "https://cdn.pixabay.com/photo/2016/07/06/03/48/minneapolis-1499809_960_720.jpg"
          // }
        })
      };
    });
  }
  placeSelectedHandler = (key) => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(place => {
          return place.key === key;
        })
      };
    });
  };

  placeDeletedHandler = () => {
    this.setState((prevState) => {
      return {
        places: prevState.places.filter((place) => {
          return place.key !== prevState.selectedPlace.key;
        }),
        selectedPlace: null,
      };
    });
  }

  modalClosedHandler = () => {
    this.setState({
      selectedPlace: null,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail 
          selectedPlace={this.state.selectedPlace}
          onModalClosed={this.modalClosedHandler}
          onItemDeleted={this.placeDeletedHandler}/>
        <InputAndButton 
            placeName={this.state.placeName}
            onChangeInputText={this.placeNameChangedHandler}
            onPress={this.placeSubmitHandler}/>
        <List 
          places={this.state.places}
          onItemSelected={this.placeSelectedHandler}/>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

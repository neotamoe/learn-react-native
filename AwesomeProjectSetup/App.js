/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';

import List from './src/components/List/List';
import InputAndButton from './src/components/InputAndButton/InputAndButton';
import placeImage from './src/assets/walker-art-center.jpg';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
import {addPlace, deletePlace, selectPlace, deselectPlace} from './src/store/actions/index';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
class App extends Component<Props> {

  placeSubmitHandler = placeName => {
    this.props.onAddPlace(placeName);
  }
  placeSelectedHandler = (key) => {
    this.props.onSelectPlace(key);
  };

  placeDeletedHandler = () => {
    this.props.onDeletePlace();
  }

  modalClosedHandler = () => {
    this.props.onDeselectPlace();
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail 
          selectedPlace={this.props.selectedPlace}
          onModalClosed={this.modalClosedHandler}
          onItemDeleted={this.placeDeletedHandler}/>
        <InputAndButton 
          onPlaceAdded={this.placeSubmitHandler} />
        <List 
          places={this.props.places}
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

const mapStateToProps = state => {
  return {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (name) => dispatch(addPlace(name)),
    onDeletePlace: () => dispatch(deletePlace()),
    onSelectPlace: (key) => dispatch(selectPlace(key)),
    onDeselectPlace: () => dispatch(deselectPlace()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
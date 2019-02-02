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
    places: []
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
        places: prevState.places.concat(prevState.placeName)
      };
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <InputAndButton 
            placeName={this.state.placeName}
            onChangeInputText={this.placeNameChangedHandler}
            onPress={this.placeSubmitHandler}/>
        <List places={this.state.places}/>
        
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

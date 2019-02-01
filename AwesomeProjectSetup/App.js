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

import ListItem from './src/components/ListItem/ListItem';

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
    this.setState(prevState => {
      return {
        places: prevState.places.concat(prevState.placeName)
      };
    });
  }
  render() {
    const placesOutput = this.state.places.map((place, idx) => (
      // <Text key={idx+place}>{place}</Text>
      <ListItem key={idx+place} placeName={place}/>
    ));
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="An Awesome Place"
            value={this.state.placeName}
            onChangeText={this.placeNameChangedHandler}
            style={styles.placeInput}/>
            <Button 
              title="Add"
              style={styles.placeButton}
              onPress={this.placeSubmitHandler}/>
        </View>
        <View style={styles.listContainer}>
          {placesOutput}
        </View>
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
  inputContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  placeInput : {
    width: "70%"
  },
  placeButton : {
    width: "30%"
  },
  listContainer: {
    width: "100%"
  }
});

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground, ScrollView} from 'react-native';
import chalkboard from './src/chalkboard.jpg';
import Ben from './src/components/ben';
import Neota from './src/components/neota';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View >
        <ImageBackground source={chalkboard} style={styles.chalkboard}>
          <ScrollView>
            <Ben />
            <Neota />
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chalkboard: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingTop: 40,
  },
});

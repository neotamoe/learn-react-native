/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, FlatList} from 'react-native';
import chalkboard from './src/chalkboard.jpg';

import moment from 'moment';

type Props = {};
export default class App extends Component<Props> {
  state = {
    startDate: moment("08-07-2018", "MM-DD-YYYY").format("MMM-DD-YYYY"),
    totalDays: 0,
    currentDate: moment(moment(), "MM-DD-YYYY").format("MMM-DD-YYYY"),
    dayCount: -1,
    days: []
  }

  componentDidMount(){
    const today = moment(this.state.currentDate);
    const start = moment(this.state.startDate);
    const calculatedDays = today.diff(start, 'days');
    this.setState({ totalDays: calculatedDays});
    this.interval = setInterval(() => this.tick(), 250);
  }

  tick() {
    if(this.state.dayCount + 1 < this.state.totalDays + 1){
      this.setState(prevState => ({
        dayCount: prevState.dayCount + 1,
        days: prevState.days.concat({ key: (prevState.dayCount + 1).toString() })
      }));  
    } else {
      clearInterval(this.interval)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={chalkboard} style={styles.chalkboard}>
          <Text style={{color: 'white', margin: 5}}>Start: {this.state.startDate}</Text>
          <Text style={{color: 'white', margin: 5}}>Today: {this.state.currentDate}</Text>
          <Text style={{color: 'white', margin: 5}}>Total Days: {this.state.totalDays}</Text>
            <FlatList
              data={this.state.days}
              style={styles.list}
              horizontal={false}
              numColumns={35}
              renderItem={({item}) => <Text style={ (parseInt(item.key)+1)%5==0 ? styles.tallyRotate : styles.tally}></Text>}
            />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  chalkboard: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingTop: 40,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  list: {
    flexDirection: "column",
    marginTop: 25
  },
  tally: {
    display: "flex",
    height: 30,
    width: 1,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderStyle: "solid",
    marginRight: 4,
    marginTop: 5,
  },
  tallyRotate: {
    display: "flex",
    height: 40,
    width: 1,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderStyle: "solid",
    marginRight: 4,
    marginTop: 0,
    left: -15,
    transform: [{rotate: '320deg'}],
  }
});

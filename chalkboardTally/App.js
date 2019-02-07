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
    startDate: moment("2018-08-07", "YYYY-MM-DD"),
    totalDays: 0,
    currentDate: moment(),
    dayCount: -1,
    days: [],
    isTallyComplete: false
  }

  componentDidMount(){
    const today = moment(this.state.currentDate);
    const start = moment(this.state.startDate);
    const calculatedDays = today.diff(start, 'days');
    this.setState({ totalDays: calculatedDays});
    this.interval = setInterval(() => this.tick(), 500);
  }

  tick() {
    if(this.state.dayCount + 1 < this.state.totalDays){
      this.setState(prevState => ({
        dayCount: prevState.dayCount + 1,
        days: prevState.days.concat({ key: (prevState.dayCount + 1).toString() })
      }));  
    } else {
      clearInterval(this.interval);
      this.setState({isTallyComplete: true})
    }
  }

  render() {
    let summary = this.state.isTallyComplete ? <View style={styles.container}>
          {/* <Text style={{color: 'white', margin: 5}}>Start: {this.state.startDate}</Text>
          <Text style={{color: 'white', margin: 5}}>Today: {this.state.currentDate}</Text> */}
          <Text style={{color: 'white', margin: 5, fontSize: 40, fontFamily: 'ChalkboardSE-Bold'}}>{this.state.totalDays} Days</Text>
        </View> : null;
    return (
      <View >
        <ImageBackground source={chalkboard} style={styles.chalkboard}>
            <Text style={{color: 'white', fontSize: 40, fontFamily: 'ChalkboardSE-Bold'}}>Tron Tally</Text>
            <FlatList
              data={this.state.days}
              style={styles.list}
              horizontal={false}
              numColumns={35}
              renderItem={({item}) => <Text style={ (parseInt(item.key)+1)%5==0 ? styles.tallyRotate : styles.tally}></Text>}
            />
            {summary}
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
    marginTop: 25,
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

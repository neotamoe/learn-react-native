import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import moment from 'moment';

class Neota extends Component {
    state = {
        startDate: moment("2018-07-31", "YYYY-MM-DD"),
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
        this.interval = setInterval(() => this.tick(), 250);            
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
        let summary = this.state.isTallyComplete ? 
            <View>
                <Text style={{color: 'white', fontSize: 32, fontFamily: 'ChalkboardSE-Bold'}}>{this.state.totalDays} Days</Text>
            </View> 
            : null;

        return (
            <View style={styles.container}>
                <Text style={{color: 'white', fontSize: 40, fontFamily: 'ChalkboardSE-Bold'}}>Neota's Wall</Text>
                <FlatList
                data={this.state.days}
                style={styles.list}
                horizontal={false}
                numColumns={35}
                renderItem={({item}) => <Text style={ (parseInt(item.key)+1)%5==0 ? styles.tallyRotate : styles.tally}></Text>}
                />
                {summary}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    summary: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
      fontSize: 16,
      textAlign: "center",
    },
    list: {
      flexDirection: "column",
    //   marginTop: 25,
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

export default Neota;
import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

class PickLocation extends Component {
    state = {
        focusedLocation: {
            latitude: 44.9778,
            longitude: -93.2650,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122,
        },
        locationChosen: false
    }

    pickLocationHandler = (event) => {
        let latLong = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: latLong.latitude,
            longitude: latLong.longitude        
        }, 500);
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: latLong.latitude,
                    longitude: latLong.longitude    
                },
                locationChosen: true
            }
        })
    }

    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(coordsEvent);    
        }, err => {
            console.log(err);
            alert("fetching position failed, pick one manually!");
        });
    }

    render() {
        let marker = null;
        if(this.state.locationChosen){
            marker = (
                <MapView.Marker coordinate={this.state.focusedLocation} />
            );
        }
        return (
            <View style={styles.container}>
                <MapView 
                    ref={ref => this.map = ref }
                    initialRegion={this.state.focusedLocation}
                    style={styles.map}
                    onPress={this.pickLocationHandler}>
                    {marker}
                </MapView>
                <View style={styles.button}>
                    <Button title="Locate Me" onPress={this.getLocationHandler}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    map: { 
        width: "100%",
        height: 250
    },
    button: {
        margin: 8
    }
});

export default PickLocation;
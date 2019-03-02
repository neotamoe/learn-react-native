import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';

import List from '../../components/List/List';
import { getPlaces } from '../../store/actions/index';

class FindPlaceScreen extends Component {
    state = {
        placesLoaded: false,
        removeAnimation: new Animated.Value(1),
        placesAnimation: new Animated.Value(0),
    }

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    componentDidMount = () => {
        console.log("*************** FIND PLACE - componentDidMount ******************");
        this.navigationEventListener = Navigation.events().bindComponent(this);
        this.props.onLoadPlaces();
    }

    componentDidAppear() {
        console.log("*************** FIND PLACE - componentDidAppear ******************");
        this.props.onLoadPlaces();
    }
    
    itemSelectedHandler = (key) => {
        const selPlace = this.props.places.find(place => {
            return place.key == key;
        });
        Navigation.push('find', {
            component: {
                name: "awesome-places.PlaceDetailScreen",
                passProps: {
                    selectedPlace: selPlace
                },
                options: {
                    topBar: {
                        title: {
                            text: selPlace.name
                        },
                    }
                }
            }            
        })
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

    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnimation, {
            toValue: 0,  // transparent
            duration: 500,
            useNativeDriver: true
        }).start(()=> {
            this.setState({
                placesLoaded: true,
            });
            this.placesLoadedHandler();
        });
    }

    placesLoadedHandler = () => {
        Animated.timing(this.state.placesAnimation, {
            toValue: 1,  // opaque
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    render() {
        let content = (
            <Animated.View style={{
                opacity: this.state.removeAnimation,
                transform: [{
                    scale: this.state.removeAnimation.interpolate({
                        inputRange: [0,1],
                        outputRange: [12,1]
                    })
                }]
            }}>
                <TouchableOpacity onPress={this.placesSearchHandler}>
                    <View style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Find Places</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );

        if(this.state.placesLoaded){
            content = (
                <Animated.View style={{
                    opacity: this.state.placesAnimation,  // fade in
                }}>
                    <List places={this.props.places} onItemSelected={this.itemSelectedHandler}/>
                </Animated.View>
            );
        }
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
                    {content}
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    searchButton: {
        borderWidth: 3,
        borderColor: 'orange',
        borderRadius: 50,
        padding: 20,
    },
    searchButtonText: {
        color: 'orange',
        fontWeight: 'bold',
        fontSize: 26
    }
})

const mapStateToProps = state => {
    return {
        places: state.places.places
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadPlaces: () => dispatch(getPlaces())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);
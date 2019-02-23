import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';

import List from '../../components/List/List';

class FindPlaceScreen extends Component {
    state = {
        placesLoaded: false
    }

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
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
        this.setState({
            placesLoaded: true
        })
    }

    render() {
        let content = (
        <TouchableOpacity onPress={this.placesSearchHandler}>
            <View style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Find Places</Text>
            </View>
        </TouchableOpacity>);

        if(this.state.placesLoaded){
            content = (
                <List places={this.props.places} onItemSelected={this.itemSelectedHandler}/>
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

export default connect(mapStateToProps)(FindPlaceScreen);
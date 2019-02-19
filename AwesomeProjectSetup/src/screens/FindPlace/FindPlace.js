import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';

import List from '../../components/List/List';

class FindPlaceScreen extends Component {
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
                        backButton: {
                            title: 'Back'
                        }
                    }
                }
            }            
        })
    }

    render() {
        return (
            <View>
                <List places={this.props.places} onItemSelected={this.itemSelectedHandler}/>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        places: state.places.places
    }
}

export default connect(mapStateToProps)(FindPlaceScreen);
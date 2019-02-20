import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';

import List from '../../components/List/List';

class FindPlaceScreen extends Component {
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
                        backButton: {
                            title: 'Back'
                        }
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
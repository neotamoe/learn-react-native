import React, {Component} from 'react';
import {Dimensions, View, Image, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {deletePlace} from '../../store/actions/index';

class PlaceDetail extends Component {
    state = {
        viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape"
    }

    constructor(props){
        super(props);
        Dimensions.addEventListener("change", this.updateViewModel);
    };

    componentWillUnmount = () => {
        Dimensions.removeEventListener("change", this.updateViewModel);
    }

    updateViewModel = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        });
    };

    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        Navigation.pop(this.props.componentId);   
    }

    render () {
        var placeText = null;
        if(this.state.viewMode === 'portrait') {
            placeText = (<Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>);
        }
        return (
            <View style={this.state.viewMode === "portrait" ? styles.portraitModalContainer : styles.landscapeModalContainer}>
                <Image 
                    source={this.props.selectedPlace.image} 
                    style={this.state.viewMode === "portrait" ? styles.portraitPlaceImage : styles.landscapePlaceImage}>
                </Image>
                {placeText}
                <View>
                    <TouchableOpacity onPress={this.placeDeletedHandler}>
                        <View style={this.state.viewMode === "portrait" ? styles.portraitDeleteButton : styles.landscapeDeleteButton}>
                            <Icon size={30} name={Platform.OS === "android" ? "md-trash" : "ios-trash"} color="red"/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    landscapeModalContainer: {
        margin: 22,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    portraitModalContainer: {
        margin: 22,
        flexDirection: "column"
    },
    portraitPlaceImage: {
        width: "100%",
        height: 200
    },
    landscapePlaceImage: {
        width: "80%",
        height: 200
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    portraitDeleteButton: {
        alignItems: "center"
    },
    landscapeDeleteButton: {
        // alignItems: "center",
    },
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    }
}


export default connect(null, mapDispatchToProps)(PlaceDetail); 

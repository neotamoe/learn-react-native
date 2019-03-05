import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import { connect } from 'react-redux';
import {Navigation} from 'react-native-navigation';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utility/validation';

import {addPlace} from '../../store/actions/index';

class SharePlaceScreen extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    state = {
        controls: {
            placeName: {
                value: "",
                valid: false,
                validationRules: {
                    validString: true
                },
                touched: false
            },
            location: {
                value: null,
                valid: false
            },
            image: {
                value: null,
                valid: false
            }    
        }
    }

    placeAddedHandler = () => {
        this.props.onAddPlace(
            this.state.controls.placeName.value, 
            this.state.controls.location.value,
            this.state.controls.image.value);
        this.reset();
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

    updateInputState = (value) => {
        this.setState( prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: value,
                        valid: validate(value, prevState.controls.placeName.validationRules),
                        touched: true
                    },    
                }
            }
        })
    }

    locationPickedHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            }
        })
    }

    imagePickedHandler = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            }
        })
    }

    reset = () => {
        this.setState({
            controls: {
                placeName: {
                    value: "",
                    valid: false,
                    validationRules: {
                        validString: true
                    },
                    touched: false
                },
                location: {
                    value: null,
                    valid: false
                },
                image: {
                    value: null,
                    valid: false
                }    
            }
        });
        this.imagePicker.reset();
        this.locationPicker.reset();
    }

    render() {
        let submitButton = 
            <Button 
                title="Share Place!" 
                onPress={this.placeAddedHandler}
                disabled={
                    !this.state.controls.placeName.valid 
                    || !this.state.controls.location.valid 
                    || !this.state.controls.image.valid}/>;

        if (this.props.isLoading) {
            submitButton = <ActivityIndicator />;
        }

        return (
            <SafeAreaView style={styles.safeArea}>
                    <KeyboardAwareScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
                        <MainText>
                            <HeadingText>Share a Place With Us!</HeadingText>
                        </MainText>
                        <PickImage 
                            onImagePick={this.imagePickedHandler}
                            ref={ref => (this.imagePicker = ref)}/>
                        <PickLocation 
                            onLocationPick={this.locationPickedHandler}
                            ref={ref => (this.locationPicker = ref)} />
                        <PlaceInput 
                            placeData={this.state.controls.placeName}
                            onChangeText={ val => this.updateInputState(val)}
                            />
                        <View style={styles.button}>
                            {submitButton}
                        </View>
                    </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center'
    },
    placeholder: { 
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: "80%",
        height: 150
    },
    button: {
        margin: 8
    },
    imagePreview: {
        width: '100%',
        height: '100%'
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'white'
    }
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);
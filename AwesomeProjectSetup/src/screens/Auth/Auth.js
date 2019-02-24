import React, {Component} from 'react';
import {View, StyleSheet, ImageBackground, Dimensions} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import validate from '../../utility/validation';

class AuthScreen extends Component {
    state = {
        viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape",
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                }
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                }
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: "password"
                }
            },
        }
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

    loginHandler() {
        startMainTabs();
    }

    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            console.log('hit the right if block');
            const equalControl = this.state.controls[key].validationRules.equalTo;
            console.log('equalControl: ', equalControl);
            const equalValue = this.state.controls[equalControl].value;
            console.log('equalValue: ', equalValue);
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }
        if(key === "password"){
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }
        this.setState( prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: 
                            key === "password"
                            ? validate(
                                prevState.controls.confirmPassword.value,
                                prevState.controls.confirmPassword.validationRules,
                                connectedValue
                                )
                            : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                    },
                }
            }
        })
    }

    render () {
        var headingText = null;
        if(this.state.viewMode === 'portrait') {
            headingText = (
                <MainText>
                    <HeadingText >Please Log In</HeadingText>
                </MainText>);
        }
        
        return (                
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    {headingText}
                    <ButtonWithBackground color="#29aaf4" onPress={() => alert('Hello')}>Switch to Login </ButtonWithBackground>
                    <View style={styles.inputContainer}>
                        <DefaultInput 
                            style={styles.input} 
                            placeholder="Your Email Address"
                            value={this.state.controls.email.value} 
                            onChangeText={val => this.updateInputState("email", val)}>
                        </DefaultInput>
                        <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
                            <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                <DefaultInput 
                                    style={styles.input} 
                                    placeholder="Password" 
                                    value={this.state.controls.password.value}
                                    onChangeText={ val => this.updateInputState("password", val)}>
                                </DefaultInput>
                            </View>
                            <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                <DefaultInput 
                                    style={styles.input} 
                                    placeholder="Confirm Password" 
                                    value={this.state.controls.confirmPassword.value}
                                    onChangeText={ val => this.updateInputState("confirmPassword", val)}>
                                </DefaultInput>
                            </View>
                        </View>
                    </View>
                    <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>Submit</ButtonWithBackground>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: "80%"
    },
    input: {
        backgroundColor: "#eee",
        borderColor: "#bbb"
    },
    backgroundImage: {
        width: "100%",
        flex: 1
    },
    landscapePasswordContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    landscapePasswordWrapper: {
        width: "45%"
    },
    portraitPasswordContainer: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    portraitPasswordWrapper: {
        width: "100%"
    }
});

export default AuthScreen;
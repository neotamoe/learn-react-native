import React, {Component} from 'react';
import {View, StyleSheet, ImageBackground, Dimensions} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import { connect } from 'react-redux';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import validate from '../../utility/validation';
import { tryAuth } from '../../store/actions/index'

class AuthScreen extends Component {
    state = {
        viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape",
        authMode: "login",
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: "password"
                },
                touched: false
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

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === "login" ? "signup" : "login"
            }
        })
    }

    updateViewModel = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        });
    };

    loginHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
        } 
        this.props.onLogin(authData);
        startMainTabs();
    }

    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
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
                        touched: true
                    },
                }
            }
        })
    }

    render () {
        var headingText = null;
        var confirmPasswordControl = null;
        if(this.state.viewMode === 'portrait') {
            headingText = (
                <MainText>
                    <HeadingText >Please {this.state.authMode === "login" ? "Log In" : "Sign Up"}</HeadingText>
                </MainText>);
        }
        if (this.state.authMode === 'signup') {
            confirmPasswordControl = (
                <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                    <DefaultInput 
                        style={styles.input} 
                        placeholder="Confirm Password" 
                        value={this.state.controls.confirmPassword.value}
                        onChangeText={ val => this.updateInputState("confirmPassword", val)}
                        touched={this.state.controls.confirmPassword.touched}
                        valid={this.state.controls.confirmPassword.valid}>
                    </DefaultInput>
                </View>
            );
        }

        return (                
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    {headingText}
                    <ButtonWithBackground 
                        color="#29aaf4" 
                        onPress={this.switchAuthModeHandler}>
                        Switch to {this.state.authMode === "login" ? "Sign Up" : "Log In"}
                    </ButtonWithBackground>
                    <View style={styles.inputContainer}>
                        <DefaultInput 
                            style={styles.input} 
                            placeholder="Your Email Address"
                            value={this.state.controls.email.value} 
                            onChangeText={val => this.updateInputState("email", val)}
                            touched={this.state.controls.email.touched}
                            valid={this.state.controls.email.valid}>
                        </DefaultInput>
                        <View style={this.state.viewMode === "portrait" || this.state.authMode === "login" ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
                            <View style={this.state.viewMode === "portrait" | this.state.authMode === "login" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                <DefaultInput 
                                    style={styles.input} 
                                    placeholder="Password" 
                                    value={this.state.controls.password.value}
                                    onChangeText={ val => this.updateInputState("password", val)}
                                    touched={this.state.controls.password.touched}
                                    valid={this.state.controls.password.valid}>
                                </DefaultInput>
                            </View>
                            {confirmPasswordControl}
                        </View>
                    </View>
                    <ButtonWithBackground 
                        color="#29aaf4" 
                        disabled={!this.state.controls.email.valid || !this.state.controls.password.valid || !this.state.controls.confirmPassword.valid && this.state.authMode === "signup"}
                        onPress={this.loginHandler}>
                        Submit
                    </ButtonWithBackground>
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

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (authData) => dispatch(tryAuth(authData))
    };
};

export default connect(null, mapDispatchToProps)(AuthScreen);
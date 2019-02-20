import React, {Component} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';

class AuthScreen extends Component {
    loginHandler() {
        startMainTabs();
    }

    render () {
        return (
            <View style={styles.container}>
                <Text>Please Log In</Text>
                <Button title="Switch to Login" />
                <View style={styles.inputContainer}>
                    <DefaultInput style={styles.input} placeholder="Your Email Address" ></DefaultInput>
                    <DefaultInput style={styles.input} placeholder="Password" ></DefaultInput>
                    <DefaultInput style={styles.input} placeholder="Confirm Password" ></DefaultInput>
                </View>
                <Button title="Login" onPress={this.loginHandler}></Button>
            </View>
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
    }
});

export default AuthScreen;
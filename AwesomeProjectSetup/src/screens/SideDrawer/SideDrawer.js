import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, SafeAreaView} from 'react-native';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';

class SideDrawer extends Component {
    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text>SideDrawer</Text>
                <View style={styles.button}>
                    <ButtonWithBackground style={styles.button} color="#29aaf4" onPress={() => alert("Logout")}>
                        Logout
                    </ButtonWithBackground>
                </View>
            </View>
            </SafeAreaView>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 22,
        paddingLeft: 10,
        backgroundColor: "white",
        flex: 1
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'white'
    },
    button: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 10,
    }
});

export default SideDrawer;
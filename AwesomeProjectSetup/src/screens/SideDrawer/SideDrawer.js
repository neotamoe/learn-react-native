import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, SafeAreaView,TouchableOpacity} from 'react-native';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import Icon from 'react-native-vector-icons/Ionicons'

class SideDrawer extends Component {
    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.sideDrawerItem}>
                        <Icon style={styles.icon} name="ios-log-out" size={30} color="#bbb"/>
                        <Text>Sign Out</Text>
                    </TouchableOpacity>
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
    container: {
        paddingTop: 30,
        backgroundColor: 'white',
        flex: 1,
    },
    sideDrawerItem: {
        flexDirection: "row",
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#eee'
    },
    icon: {
        marginRight: 10
    }
});

export default SideDrawer;
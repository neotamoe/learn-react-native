import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, SafeAreaView,TouchableOpacity, Platform} from 'react-native';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import Icon from 'react-native-vector-icons/Ionicons';

import {connect} from 'react-redux';
import {authLogout} from '../../store/actions/index';

class SideDrawer extends Component {
    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.sideDrawerItem} onPress={this.props.onLogout}>
                        <Icon style={styles.icon} name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"} size={30} color="#bbb"/>
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

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authLogout()),
    }
}

export default connect(null, mapDispatchToProps)(SideDrawer);
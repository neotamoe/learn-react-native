import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Text can't be styled like the View so we wrap Text in View
const listItem = (props) => (
    <View style={styles.listItem}>
        <Text>{props.placeName}</Text>
    </View>
);

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        padding: 10,
        backgroundColor: "#eee",
        margin: 5
    }
})

export default listItem;
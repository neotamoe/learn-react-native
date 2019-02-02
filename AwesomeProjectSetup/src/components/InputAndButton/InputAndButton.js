import React from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';

const inputAndButton = (props) => (
    <View style={styles.inputContainer}>
        <TextInput 
            placeholder="An Awesome Place"
            value={props.placeName}
            onChangeText={props.onChangeInputText}
            style={styles.placeInput} />
        <Button 
            title="Add"
            style={styles.placeButton}
            onPress={props.onPress} />
    </View>
);

const styles = StyleSheet.create({
    placeInput: {
        width: "70%"
    },
    placeButton : {
        width: "30%"
    },
    inputContainer: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },
});

export default inputAndButton;
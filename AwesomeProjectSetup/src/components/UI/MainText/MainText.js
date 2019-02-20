import React from 'react';
import {Text, StyleSheet} from 'react-native';

const mainText = props => {
    return (
        <Text style={styles.mainText}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    mainText: {
        color: '#bbb'
    }
});

export default mainText;

/*  
    this allows us to simulate a cascading text by wrapping any text with this element
    which gives the same text style.  could also make a paragraph text element.  using this
    method if you change text style throughout the app, you only need to change it here.  
*/
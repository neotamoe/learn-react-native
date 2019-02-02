import React from 'react';
import {View, StyleSheet} from 'react-native';
import ListItem from '../ListItem/ListItem';

const list = (props) =>  {
    console.log('props.places in list: ', props.places);
    let displayList = props.places.map((place, i) => {
        return (
            <ListItem key={i} placeName={place} />
        );
    });
    return (
        <View style={styles.listContainer}>
            {displayList}
        </View>
    );
    
}

const styles = StyleSheet.create({
    listContainer: {
      width: "100%",
    }
});

export default list;
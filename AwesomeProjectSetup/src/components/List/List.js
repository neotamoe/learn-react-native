import React from 'react';
import { StyleSheet, ScrollView} from 'react-native';
import ListItem from '../ListItem/ListItem';

const list = (props) =>  {
    let displayList = props.places.map((place, i) => {
        return (
            <ListItem 
                key={i} 
                placeName={place} 
                onItemPressed={() => props.onItemDeleted(i)}/>
        );
    });
    return (
        <ScrollView style={styles.listContainer}>
            {displayList}
        </ScrollView>
    );
    
}

const styles = StyleSheet.create({
    listContainer: {
      width: "100%",
    }
});

export default list; 
import React, {Component} from 'react';
import {View, Image, Button, StyleSheet} from 'react-native';

import ImagePicker from 'react-native-image-picker';

class PickImage extends Component {
    state = {
        pickedImage: {
            uri: null
        }
    }

    pickImageHandler = () => {
        ImagePicker.showImagePicker({title: 'Pick an Image'}, res => {
            if (res.didCancel){
                console.log("user cancelled");
            } else if (res.error){
                console.log("error", res.error);
            } else {
                this.setState({
                    pickedImage: {uri: res.uri}
                });
                this.props.onImagePick({uri: res.uri, base64: res.data});
                // base64 returns string so you can store it in db,
                // if you want to turn off, add noData: true to options object (the first param of showImagePicker)
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={this.state.pickedImage} style={styles.imagePreview} />
                </View>
                <View style={styles.button}>
                    <Button title="Pick Image" onPress={this.pickImageHandler}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    placeholder: { 
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: "80%",
        height: 150
    },
    button: {
        margin: 8
    },
    imagePreview: {
        width: '100%',
        height: '100%'
    }
});

export default PickImage;
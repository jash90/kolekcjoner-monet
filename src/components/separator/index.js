import React, { Component } from 'react';
import { View,Text, StyleSheet } from 'react-native';

class Separator extends Component {
    render() {
        return (
            <View style={styles.contener}>
                <Text style={styles.text}>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    text:{
        padding: 10 
    },
    contener:{
        borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0
    }
});
export default Separator;
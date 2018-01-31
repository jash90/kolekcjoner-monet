import React, {Component} from 'react';
import {View, Modal, ActivityIndicator, Text, StyleSheet} from 'react-native';

class ModalLoading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal visible={this.props.visible} transparent={true}>
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <View>
                            <ActivityIndicator/>
                        </View>
                        <View style={styles.text}>
                            <Text>
                                {this.props.text}
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default ModalLoading;

const styles = StyleSheet.create({
    text: {
        marginLeft: 10
    },
    container: {
        padding: 20,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
    },
    overlay: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center"
    }
})
import React, { Component } from "react";
import { View, Modal, Image, Text, StyleSheet, TouchableWithoutFeedback}  from "react-native";
class ModalImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Modal visible={this.props.visible} transparent={true} supportedOrientations={["portrait", "landscape"]}>
        <TouchableWithoutFeedback onPress={()=>this.props.onCancel()}>
        <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={{ backgroundColor: "#fff", width: "100%", flex: 1 }} />
          <Image source={typeof this.props.image === 'string' ? { uri: this.props.image } : this.props.image} 
          resizeMode="contain" style={{ width: "100%", flex: 5 }} />
          <View style={{ backgroundColor: "#fff", width: "100%", flex: 1 }} />
        </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>;
  }
}
const styles = StyleSheet.create({
  overlay: {
    width:'100%',
    height:'100%',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    width: "90%",
    height: "80%",
    backgroundColor: "#fff",
    borderRadius: 5
  }
});

export default ModalImage;

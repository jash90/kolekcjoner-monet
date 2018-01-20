import React, { Component } from "react";
import {
  View,
  Modal,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
class ImagePlaceholder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
      return (
        this.props.source == null ? this.renderPlaceholder() : this.renderImage()
      );
  }

  renderImage() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress()}>
        <Image
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
          source={
            typeof this.props.source === "string"
              ? {
                  uri: this.props.source
                }
              : this.props.source
          }
        />
      </TouchableOpacity>
    );
  }
  renderPlaceholder() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress()}>
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#666666",
            alignItems: "center",
            justifyContent:"center"
          }}
        >
          <Text style={{color:"#fff", fontSize:30}}>{this.props.textPlaceholder}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({});

export default ImagePlaceholder;

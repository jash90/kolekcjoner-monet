import React, {Component} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

class ImagePlaceholder extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return this.props.source == null
            ? this.renderPlaceholder()
            : this.renderImage();
    }

    renderImage() {
        return (
            <TouchableOpacity onPress={() => this.props.onPress()}>
                <Image
                    resizeMode="cover"
                    style={{
                    width: "100%",
                    height: "100%"
                }}
                    source={this.props.source}/>
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
                    justifyContent: "center",
                    alignContent: "center"
                }}>
                    <Text
                        style={{
                        color: "#fff",
                        fontSize: 30,
                        textAlign: "center"
                    }}>
                        {this.props.textPlaceholder}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({});

export default ImagePlaceholder;

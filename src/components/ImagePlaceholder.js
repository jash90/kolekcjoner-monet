import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from 'native-base';

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
            <View>
                <TouchableOpacity style={{ zIndex: -9999 }} onPress={() => this.props.onPress()}>
                    <Image
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: "100%",
                            zIndex: -99999
                        }}
                        source={this.props.source} />

                </TouchableOpacity>
                <View style={{
                    position: "absolute",
                    top: "0%",
                    left: "0%",
                    width: "100%",
                    height: "100%",
                    alignItems: "flex-end",
                    justifyContent: "flex-end"
                }}>

                    <View style={{
                        width: 30,
                        height: 30,
                        backgroundColor: "#fff",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <TouchableOpacity onPress={() => this.props.onPress()}>
                            <Icon name="md-create" style={{ fontSize: 20, color: 'black' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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

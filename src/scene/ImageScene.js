import React, { Component } from "react";
import { Dimensions, ScrollView, TextInput, View, Image } from "react-native";
import {
    Body,
    Button,
    Container,
    Content,
    Drawer,
    Form,
    Header,
    Icon,
    Input,
    Item,
    Label,
    Left,
    List,
    ListItem,
    Right,
    Text,
    Thumbnail
} from "native-base";
import SideBar from "../components/SideBar";
import ImagePicker from "react-native-image-picker";
import ImagePlaceholder from "../components/ImagePlaceholder";
import firebase from 'react-native-firebase';
import ModalLoading from '../components/ModalLoading';
import { Actions } from "react-native-router-flux";
import Separator from '@components/separator'

class ImageScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            login:"rafal@gg.pl",
            password:"1234567"
        }
    }
    componentDidMount = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.login, this.state.password)
            .then(data => {
                firebase
                    .storage()
                    .ref("0bykJkOnK2NyU3wpLCXZ.jpg")
                    .getDownloadURL()
                    .then(url => {
                        this.setState({ image: url })
                    })
                    .catch((error) => {
                        console.log(error);
                    })

            })
            .catch(error => {
                console.log(error);
            });
      
    }

    render() {
        return (
            <Image
                    source={{ uri: this.state.image}}
            style={{ width: "100%", height: "100%" }}
            />
        );
    }
}

export default ImageScene;
import React, {Component} from "react";
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Form,
  Item,
  Label,
  Input,
  Icon,
  Body,
  Left,
  Right,
  Drawer,
  ListItem,
  Thumbnail,
  List
} from "native-base";
import SideBar from "../components/SideBar";
import ImagePicker from "react-native-image-picker";
import ImagePlaceholder from "../components/ImagePlaceholder";
import firebase from 'react-native-firebase';
import Moment from 'moment';
class SendScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      uri: null,
      user : null
    };
    this.ref = firebase
    .firestore()
    .collection("posts");
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.openDrawer()}>
              <Icon
                name={"ios-menu"}
                style={{
                color: "#fff"
              }}/>
            </Button>
          </Left>
          <Body>
            <Text style={{
              color: "#fff"
            }}>Wyślij zdjęcie</Text>
          </Body>
          <Right>
            <Button transparent onPress={() => this.sendImage()}>
              <Icon
                name={"ios-send"}
                style={{
                color: "#fff"
              }}/>
            </Button>
          </Right>
        </Header>
        <ScrollView
          contentContainerStyle={{
          width: "100%",
          height: "100%"
        }}>
          <Drawer
            ref={ref => {
            this.drawer = ref;
          }}
            content={< SideBar />}
            onClose={() => this.closeDrawer()}>
            <View
              style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#fff",
              padding: 20,
              alignItems: "center"
            }}>
              <View
                style={{
                width: Dimensions
                  .get("window")
                  .width - 200,
                height: Dimensions
                  .get("window")
                  .width - 200,
                backgroundColor: "#fff",
                alignSelf: "center",
                marginBottom: 10
              }}>
                <ImagePlaceholder
                  source={this.state.uri}
                  textPlaceholder="Wybierz zdjęcie"
                  onPress={() => this.selectPhotoTapped()}/>
              </View>
              <TextInput
                style={{
                borderWidth: 1,
                borderColor: "#000",
                borderRadius: 20,
                padding: 10,
                width: "100%",
                height: 200,
                textAlignVertical: "top"
              }}
                multiline={true}
                placeholder="Opis"
                underlineColorAndroid="transparent"/>
            </View>
          </Drawer>
        </ScrollView>
      </Container>
    );
  }
  closeDrawer = () => {
    this
      .drawer
      ._root
      .close();
  };
  openDrawer = () => {
    this
      .drawer
      ._root
      .open();
  };
  selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = {
          uri: response.uri
        };
        this.setState({uri: source, image : response});
      }
    });
  };
  sendImage = () => {
    var user = firebase.firestore().doc("users/" + this.props.user.id);
    this.ref.add({
      description : "opis",
      likes:[],
      comments :[],
      dateupdate : Moment(),

    }).then((response)=>{
      console.log(response.doc());
    }).catch((error)=>{
      console.log(error);
    });
    firebase
      .storage()
      .ref('/uploadOk.jpeg')
      .putFile(this.state.image.path)
      .then((successCb) => {
        console.log(successCb);
      })
      .catch((failureCb) => {
        console.log(failureCb);
      });
  }
}

export default SendScene;

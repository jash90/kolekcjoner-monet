import React, { Component } from "react";
import { Platform, StyleSheet, View, Image } from "react-native";
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
import ImagePlaceholder from '../components/ImagePlaceholder';
class SendScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.openDrawer()}>
              <Icon name={"ios-menu"} style={{ color: "#fff" }} />
            </Button>
          </Left>
          <Body>
            <Text style={{ color: "#fff" }}>Wyślij zdjęcie</Text>
          </Body>
          <Right>
            <Button transparent>
              <Icon name={"ios-send"} style={{ color: "#fff" }} />
            </Button>
          </Right>
        </Header>
        <Drawer
          ref={ref => {
            this.drawer = ref;
          }}
          content={<SideBar />}
          onClose={() => this.closeDrawer()}
        >
          <View style={{ backgroundColor: "#fff" }}>
            <ImagePlaceholder
              source={ this.state.image }
              textPlaceholder="Wybierz zdjęcie"
              onPress={()=>this.selectPhotoTapped()}
            />
          </View>
        </Drawer>
      </Container>
    );
  }
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  selectPhotoTapped=()=> {
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
        let source = { uri: response.uri };

        this.setState({
          image: source
        });
      }
    });
  }
}

export default SendScene;

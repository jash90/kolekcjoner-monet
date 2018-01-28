import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView
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
  Card,
  CardItem,
  Thumbnail,
  List
} from "native-base";
import SideBar from "../components/SideBar";
import { PhotoGrid } from "../components/PhotoGrid";
import Photo from "../img/Photo";
import ModalImage from "../components/ModalImage";
import firebase from "react-native-firebase";
class MyCollections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      image: null,
      photos: [],
      posts: []
    };
  }
 async componentWillMount() {
    var ref = firebase.firestore().doc("users/" + this.props.user.id);
    console.log(ref);
    const postss = [];
    var photos = [];
    firebase
      .firestore()
      .collection("posts")
      .where("idusers", "==", ref)
      .get()
      .then(posts => {
        posts.forEach((post) => {
          var p = post.data();
          p.id = post.id;
          firebase
            .storage()
            .ref(post.id + ".jpg")
            .getDownloadURL()
            .then(url => {
              post.link = url;
              postss.push(posts);
              photos.push(url);
              this.setState({postss});
              this.setState({photos});
            });
        });
      });
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
                }}
              />
            </Button>
          </Left>
          <Body>
            <Text
              style={{
                color: "#fff"
              }}
            >
              Moja kolekcja
            </Text>
          </Body>
        </Header>
        <Drawer
          ref={ref => {
            this.drawer = ref;
          }}
          content={<SideBar />}
          onClose={() => this.closeDrawer()}
        >
          <Content>
            <View
              style={{
                justifyContent: "center",
                alignSelf: "center"
              }}
            >
              <Thumbnail
                large
                source={{
                  uri: this.props.user.link
                }}
              />
              <View
                style={{
                  alignItems: "center"
                }}
              >
                <Text>
                  {this.props.user.firstname + " " + this.props.user.lastname}
                </Text>
              </View>
            </View>
            <PhotoGrid PhotosList={this.state.photos} borderRadius={10} />
            <ModalImage
              visible={this.state.visible}
              image={this.state.image}
              onCancel={() => this.onDismissModal()}
            />
          </Content>
        </Drawer>
      </Container>
    );
  }
  onVisibleImage = img => {
    this.setState({ image: img });
    this.setState({ visible: true });
  };
  onDismissModal = () => {
    this.setState({ visible: false });
  };
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
}

export default MyCollections;

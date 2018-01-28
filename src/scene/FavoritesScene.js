import React, {Component} from "react";
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Modal,
  TouchableOpacity,
  AsyncStorage
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
import {Actions} from "react-native-router-flux";
import ImageViewer from "react-native-image-view";
import firebase from "react-native-firebase";
import Moment from "moment";
import TimeAgo from "javascript-time-ago";
import pl from "javascript-time-ago/locale/pl";
TimeAgo.locale(pl);
const timeAgo = new TimeAgo("pl-PL");
class FavoritesScene extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase
      .firestore()
      .collection("favorites");
    this.storage = firebase.storage();
    this.unsubscribe = null;
    this.state = {
      loading: true,
      posts: [],
      image: "",
      name: ""
    };
  }
  componentDidMount() {
    this.unsubscribe = this
      .ref
      .onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  onCollectionUpdate = querySnapshot => {
    const posts = [];
    firebase
      .firestore()
      .doc("favorites/NbcZVRCcpRWAjOsx47L7CJArCH83")
      .get()
      .then((fav) => {
        fav
          .data()
          .posts
          .forEach((p) => {
            p
              .get()
              .then((doc) => {
                var post = doc.data();
                post.id = doc.id;
                post
                  .idusers
                  .get()
                  .then(user => {
                    post.user = user.data();
                    post.user.id = user.id;
                    firebase
                      .storage()
                      .ref(post.user.id + ".jpg")
                      .getDownloadURL()
                      .then(url => {
                        post.user.link = url;
                        firebase
                          .storage()
                          .ref(post.id + ".jpg")
                          .getDownloadURL()
                          .then(url => {
                            post.link = url;
                            posts.push(post);
                            this.setState({posts});
                          });
                      });
                  });
              });
          });

      });

  };
  render() {
    return <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => this.openDrawer()}>
            <Icon name={"ios-menu"} style={{
              color: "#fff"
            }}/>
          </Button>
        </Left>
        <Body>
          <Text style={{
            color: "#fff"
          }}>Ulubione Monety</Text>
        </Body>
      </Header>
      <Drawer
        ref={ref => {
        this.drawer = ref;
      }}
        content={< SideBar />}
        onClose={() => this.closeDrawer()}>
        <Content>
          <List
            dataArray={this.state.posts}
            renderRow={item => <Card style={{
            flex: 0
          }}>
            <CardItem>
              <Left>
                <Thumbnail source={{
                  uri: item.user.link
                }}/>
                <Body>
                  <Text>
                    {item.user.firstname + " " + item.user.lastname}
                  </Text>
                  <Text note>
                    {Moment(item.dateupdate).format("DD.MM.YYYY")}
                  </Text>
                </Body>
              </Left>
              <Right>
                <Text>{timeAgo.format(item.dateupdate)}</Text>
              </Right>
            </CardItem>
            <CardItem cardBody>
              <Body>
                <Image
                  source={{
                  uri: item.link
                }}
                  style={{
                  width: "95%",
                  height: 200,
                  alignSelf: "center",
                  flex: 1
                }}/>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up"/>
                  <Text>{item.likes.length + " Likes"}</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles"/>
                  <Text>{item.comments.length + " Comments"}</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>}/>
        </Content>
      </Drawer>
    </Container>;
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
}

export default FavoritesScene;

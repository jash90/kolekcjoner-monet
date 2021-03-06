import React, { Component } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import {
  Body,
  Button,
  Card,
  CardItem,
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
  Right,
  Text,
  Thumbnail
} from "native-base";
import SideBar from "../components/SideBar";
import { Actions } from "react-native-router-flux";
import firebase from "react-native-firebase";
import Moment from "moment";
import TimeAgo from "javascript-time-ago";
import pl from "javascript-time-ago/locale/pl";
import LoadingList from '../components/LoadingList';
import _ from 'lodash';
TimeAgo.locale(pl);
const timeAgo = new TimeAgo("pl-PL");

class HomeScene extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase
      .firestore()
      .collection("posts")
      .orderBy("dateupdate", "desc");
    this.storage = firebase.storage();
    this.unsubscribe = null;
    this.state = {
      loading: true,
      posts: [],
      posts2: [],
      image: "",
      name: "",
      user:null,
      favorites:null
    };
  }

  async componentDidMount() {
    this.unsubscribe = this
      .ref
      .onSnapshot(this.onCollectionUpdate);
      var id = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("favorites")
      .doc(id)
      .get()
      .then((doc) => {
        this.setState({favorites:doc.data().posts});

      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = querySnapshot => {
    console.log(querySnapshot);
    const added = [];
    const change = [];
    const remove =[];
    this.setState({ loading: true });
    querySnapshot.docChanges.forEach(doc => {
      // tab.push(doc);
      // console.log(doc.type)
      if (doc.type == "added") {
        var post = doc.doc.data();
        post.id = doc.doc.id;
        added.push(post);

      }
      if (doc.type == "modified") {
        var post = doc.doc.data();
        post.id = doc.doc.id;
        change.push(post);
      }
      if (doc.type == "removed") {
        var post = doc.doc.data();
        post.id = doc.doc.id;
        remove.push(post);
      }
    });
    added.forEach((post)=>{
      post
        .idusers
        .get()
        .then(user => {
          post.user = user.data();
          post.user.id = user.id;
          firebase
            .storage()
            .ref(user.id + ".jpg")
            .getDownloadURL()
            .then(url => {
              post.user.link = url;
            });
        });
      firebase
        .storage()
        .ref(post.id + ".jpg")
        .getDownloadURL()
        .then(url => {
          post.link = url;

        });
    });
    if (added.length>0)
  setTimeout(()=>{this.setState({posts:this.state.posts.concat(added)})},2000);
    if (change.length > 0)
  setTimeout(() => { 
    var newposts = this.state.posts;
    console.log(newposts);
    for(var i =0; i<newposts.length;i++){
      for (var j = 0; j < change.length; j++) {
        if (newposts[i].id===change[j].id){
          change[i].user = newposts[i].user;
          console.log(newposts[i]);
          change[i].link = newposts[i].link;
          newposts[i]=change[j];
          this.setState({posts:newposts});
        }
      }
    }
    console.log(this.state.posts);
  }, 2000);

  console.log(this.state.posts);
    // for (var i=0;i<querySnapshot.docChanges.length;i++){   var doc  =
    // querySnapshot.docChanges[0]; } var post = doc.data(); post.id = doc.id; post
    //  .idusers   .get()   .then(user => {     post.user = user.data();
    // post.user.id = user.id;     firebase       .storage()       .ref(post.user.id
    // + ".jpg")       .getDownloadURL()       .then(url => {         post.user.link
    // = url;         firebase           .storage()           .ref(post.id + ".jpg")
    //           .getDownloadURL()           .then(url => {             post.link =
    // url;             console.log(url);             posts.push(post);
    // this.setState({posts});             this.setState({loading: false});
    //  });       });   });

  };
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
                }} />
            </Button>
          </Left>
          <Body>
            <Text style={{
              color: "#fff"
            }}>Kolekcjoner Monet</Text>
          </Body>
        </Header>
        <Drawer
          ref={ref => {
            this.drawer = ref;
          }}
          content={< SideBar />}
          onClose={() => this.closeDrawer()}>
          <Content style={{
            backgroundColor: "#fff"
          }}>
            <List
              dataArray={this.state.posts}
              style={{
                width: "100%"
              }}
              renderRow={item => (
                <Card style={{
                  flex: 1
                }}>
                  <CardItem>
                    <TouchableOpacity onPress={() => Actions.MyCollections({ user: item.user })}>
                      <View
                        style={{
                          flex: 1,
                          marginRight: 10
                        }}>
                        <Thumbnail
                          small
                          source={item.user.link == null
                            ? require("../img/user.jpg")
                            : {
                              uri: item.user.link
                            }} />
                      </View>
                    </TouchableOpacity>
                    <Body>
                      <Text>
                        {item.user.firstname + " " + item.user.lastname}
                      </Text>
                      <Text
                        note
                        style={{
                          fontSize: 12
                        }}>
                        {Moment(item.dateupdate).format("DD.MM.YYYY")}
                      </Text>
                    </Body>
                    <Right>
                      <Text>{timeAgo.format(item.dateupdate)}</Text>
                    </Right>
                  </CardItem>
                  <CardItem cardBody>
                    <TouchableOpacity
                      style={{
                        flex: 1
                      }}
                      onPress={() => Actions.PostDetails({ post: item, user: this.props.user })}>
                      <View style={{
                        flex: 1
                      }}>
                        <Image
                          resizeMethod={"scale"}
                          resizeMode={"contain"}
                          source={{
                            uri: item.link
                          }}
                          style={{
                            width: "95%",
                            height: 200,
                            alignSelf: "center",
                            flex: 1
                          }} />
                      </View>
                    </TouchableOpacity>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Button transparent onPress={() => this.toggleLike(item, this.props.user.id)}>
                        <Icon
                          name={item
                            .likes
                            .includes(this.props.user.id)
                            ? "ios-thumbs-up"
                            : "ios-thumbs-up-outline"} />
                        <Text>{item.likes.length + " Likes"}</Text>
                      </Button>
                    </Left>
                    <Body>
                      <Button transparent>
                        <Icon active name="chatbubbles" />
                        <Text>{item.comments.length + " Comments"}</Text>
                      </Button>
                    </Body>
                  </CardItem>
                  {this.renderDescription(item.description)}
                </Card>
              )} />
          </Content>
        </Drawer>
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
  toggleLike = (item, iduser) => {
    //
    if (item.likes.includes(iduser)) {
      item
        .likes
        .splice(item.likes.indexOf(iduser), 1);
    } else {
      item
        .likes
        .push(iduser);
    }
    var likes = item.likes;
    firebase
      .firestore()
      .collection("posts")
      .doc(item.id)
      .get()
      .then((doc) => {
        doc
          .ref
          .update({ likes });

      });
      var post = 
      firebase
      .firestore()
      .collection("posts")
      .doc(item.id);
      console.log(this.state.favorites.includes(post));
      console.log(this.state.favorites);
  }
  renderDescription(description) {
    if (description.length > 0) {
      return (<CardItem>
        <Left>
          <Text style={{ paddingBottom: 20 }}>{description}</Text>
        </Left>
      </CardItem>)
    }
  }
}

export default HomeScene;

import React, {Component} from "react";
import {Image, TouchableOpacity, View} from "react-native";
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
import {Actions} from "react-native-router-flux";
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
      posts2:[],
      image: "",
      name: ""
    };
  }

  async componentDidMount() {
    this.unsubscribe = this
      .ref
      .onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = querySnapshot => {
    console.log(querySnapshot);
    const posts = this.state.posts;
    const tab = [];
    this.setState({loading: true});
    querySnapshot.docChanges.forEach(doc => {
      // tab.push(doc);
       // console.log(doc.type)
       if (doc.type == "added") {
               var post = doc.doc.data();
        post.id = doc.doc.id;
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
                    posts.sort(function(a,b){
                      return Moment(b.dateupdate).unix() - Moment(a.dateupdate).unix();
                    });
                    this.setState({ posts });
                  })
                  .catch(error => {
                    console.log(error);
                    console.log(user);
                  });
              })
              .catch(error => {
                console.log(error);
                  console.log(user);
              });
             })
             .catch((error)=>{
               console.log(error);
                 console.log(post);
             });
 
       }
       if (doc.type == "modified") {
         // console.log("MOD");
         // console.log(doc.doc.data());
       }
       if (doc.type == "removed") {
         console.log("REM");
         // this.state.posts.forEach((value)=>{
         //   console.log(value);
         //   if (value.id==doc.doc.id){
         //     console.log("REM",value);
         //     var p = this.state.posts.splice(this.state.posts.indexOf(value),1);
         //     this.setState({posts:p});
         //     console.log(this.state.posts);
         //   }
         // });
       }
     });
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
              }}/>
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
                    <TouchableOpacity onPress={() => Actions.MyCollections({user: item.user})}>
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
                          }}/>
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
                      onPress={() => Actions.PostDetails({post: item, user: this.props.user})}>
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
                        }}/>
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
                          : "ios-thumbs-up-outline"}/>
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
                  <CardItem>
                    <Left>
                      <Text>{item.description}</Text>
                    </Left>
                  </CardItem>
                </Card>
              )}/>
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
          .update({likes});

      });
  }
}

export default HomeScene;

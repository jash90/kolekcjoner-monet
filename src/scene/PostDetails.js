import React, { Component } from "react";
import { Image, View, Keyboard } from "react-native";
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
import TimeAgo from "javascript-time-ago";
import pl from "javascript-time-ago/locale/pl";
import Moment from "moment";
import firebase from "react-native-firebase";
TimeAgo.locale(pl);
const timeAgo = new TimeAgo("pl-PL");

class HomeScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            userId:""
        }
    }
    componentWillMount() {
        var user = firebase.auth().currentUser;
        this.setState({userId:user.uid});
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
                                }} />
                        </Button>
                    </Left>
                    <Body>
                        <Text
                            style={{
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
                    <Content>
                        <Card style={{
                            flex: 1
                        }}>
                            <CardItem>
                                <Left>
                                    <Thumbnail
                                        small
                                        source={(this.props.post.user.link == null)
                                            ? require('../img/user.jpg')
                                            : {
                                                uri: this.props.post.user.link
                                            }} />
                                    <Body>
                                        <Text>
                                            {this.props.post.user.firstname + " " + this.props.post.user.lastname}
                                        </Text>
                                        <Text
                                            note
                                            style={{
                                                fontSize: 12
                                            }}>
                                            {Moment(this.props.post.dateupdate).format("DD.MM.YYYY")}
                                        </Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <Text>{timeAgo.format(this.props.post.dateupdate)}</Text>
                                </Right>
                            </CardItem>
                            <CardItem cardBody>
                                <Body>
                                    <Image
                                        resizeMethod={"scale"}
                                        resizeMode={"contain"}
                                        source={{
                                            uri: this.props.post.link
                                        }}
                                        style={{
                                            width: "95%",
                                            height: 200,
                                            alignSelf: "center",
                                            flex: 1
                                        }} />
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Button
                                        transparent onPress={() => this.toggleLike(this.props.post, this.state.userId)}>
                                        <Icon
                                            name={this
                                                .props
                                                .post
                                                .likes
                                                .includes(this.state.userId)
                                                ? "ios-thumbs-up"
                                                : "ios-thumbs-up-outline"} />
                                        <Text>{this.props.post.likes.length + " Likes"}</Text>
                                    </Button>
                                </Left>
                                <Body>
                                    <Button transparent>
                                        <Icon active name="chatbubbles" />
                                        <Text>{this.props.post.comments.length + " Comments"}</Text>
                                    </Button>
                                </Body>
                            </CardItem>
                            {this.props.post.description.length > 0 ?
                                <CardItem >
                                    <Left>
                                        <Text style={{ paddingBottom: 20 }}>{this.props.post.description}</Text>
                                    </Left>
                                </CardItem> :
                                null
                            }
                            <CardItem>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        width: "100%"
                                    }}>
                                    <Thumbnail
                                        small
                                        source={(this.props.user.link == null)
                                            ? require('../img/user.jpg')
                                            : {
                                                uri: this.props.user.link
                                            }}
                                        style={{
                                            marginRight: 10
                                        }} />
                                    <Input
                                        placeholder={"Dodaj Komentarz..."}
                                        style={{
                                            backgroundColor: "#fafafa",
                                            borderRadius: 20,
                                            marginRight: 20
                                        }}
                                        value={this.state.comment}
                                        onChangeText={(text) => this.setState({ comment: text })}
                                    />
                                    <Button onPress={() => this.sendComment(this.props.post, this.state.userId)}>
                                        <Icon name="send" />
                                    </Button>
                                </View>
                            </CardItem>
                            <List
                                dataArray={this.props.post.comments.sort((a, b) => { return b.dateupdate - a.dateupdate })}
                                renderRow={item => (
                                    <CardItem>
                                        <Left>
                                            <Thumbnail
                                                small
                                                source={(item.link == null)
                                                    ? require('../img/user.jpg')
                                                    : {
                                                        uri: item.url
                                                    }}
                                                style={{
                                                    marginRight: 10
                                                }} />
                                            <Text>{item.description}</Text>
                                        </Left>
                                    </CardItem>
                                )} />
                        </Card>
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



    }
    sendComment = (item, iduser) => {
        var comment = {};
        comment.dateupdate = new Date();
        comment.description = this.state.comment;
        comment.idusers = firebase
            .firestore()
            .doc("users/" + iduser);
        var comments = item.comments;
        comments.push(comment);
        firebase
            .firestore()
            .collection("posts")
            .doc(item.id)
            .get()
            .then((doc) => {
                doc
                    .ref
                    .update( {comments });

            });
        Keyboard.dismiss();
        this.setState({ comment: "" });
    }
}

export default HomeScene;

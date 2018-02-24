import React, { Component } from "react";
import { Image } from "react-native";
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
import firebase from "react-native-firebase";
import Moment from "moment";
import TimeAgo from "javascript-time-ago";
import pl from "javascript-time-ago/locale/pl";
import LoadingList from '../components/LoadingList';
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
        this.setState({ loading: true });
        firebase
            .firestore()
            .doc("favorites/" + this.props.user.id)
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
                                                        posts.sort((a, b) => {
                                                            return a.dateupdate - b.dateupdate;
                                                        });
                                                        this.setState({ posts });
                                                    });
                                            });
                                    });
                            });
                    });
                this.setState({ loading: false });

            });

    };
    render() {
        return <Container>
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
                    }}>Ulubione Monety</Text>
                </Body>
            </Header>
            <Drawer
                ref={ref => {
                    this.drawer = ref;
                }}
                content={< SideBar />}
                onClose={() => this.closeDrawer()}>
                <Content
                    style={{
                        backgroundColor: "#fff"
                    }}>
                    <LoadingList
                        loading={this.state.loading}
                        condition={this.state.posts.length == 0}
                        text={"Brak Postów"}
                        loadingText={"Loading"}>
                        <List
                            dataArray={this.state.posts}
                            style={{
                                width: "100%"
                            }}
                            renderRow={item => <Card style={{
                                flex: 0
                            }}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail
                                            source={(item.user.link == null)
                                                ? require('../img/user.jpg')
                                                : {
                                                    uri: item.user.link
                                                }} />
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
                                            }} />
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Button transparent>
                                            <Icon active name="thumbs-up" />
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
                                {this.renderDescription(item.description.length)}
                            </Card>} />
                    </LoadingList>
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
    renderDescription(length) {
        if (length > 0) {
            return (<CardItem>
                <Left>
                    <Text style={{ paddingBottom: 20 }}>{item.description}</Text>
                </Left>
            </CardItem>)
        }
    }
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
}

export default FavoritesScene;

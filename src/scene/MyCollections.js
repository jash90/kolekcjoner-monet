import React, { Component } from "react";
import { View, Image, ActivityIndicator, AsyncStorage } from "react-native";
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
import { PhotoGrid } from "../components/PhotoGrid";
import ModalImage from "../components/ModalImage";
import ModalLoading from '../components/ModalLoading';
import firebase from "react-native-firebase";
import { Actions } from 'react-native-router-flux';
import LoadingList from '../components/LoadingList';

class MyCollections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            image: null,
            photos: [],
            posts: [],
            follow: false,
            loading: true,
            myId: null
        };
    }

    async componentWillMount() {
        try {
            const value = await AsyncStorage.getItem('@UserId:key');
            if (value !== null) {
                this.setState({ myId: value });
                console.log(this.state.myId);
                console.log(this.props.user.id);
                console.log(this.state.myId == this.props.user.id);
            }
        } catch (error) {
            console.log(error);
        }
        if (this.props.followers != null) {
            var followers = this.props.followers;
            this.setState({ follow: followers.includes(this.props.user) });
        }
        var ref = firebase
            .firestore()
            .doc("users/" + this.props.user.id);
        console.log(ref);
        const postss = [];
        var photos = [];
        this.setState({ loading: true });
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
                            this.setState({ postss });
                            this.setState({ photos });
                            console.log(posts);
                        })
                        .catch((error) => {
                            console.log(error);
                            // this.setState({loading:false});
                        })

                });
            })
            .finally(() => {
                this.setState({ loading: false });
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
                                }} />
                        </Button>
                    </Left>
                    <Body>
                        <Text
                            style={{
                                color: "#fff"
                            }}>
                            Moja kolekcja
                        </Text>
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
                        <View
                            style={{
                                flexDirection: 'row',
                                margin: 20
                            }}>
                            <View
                                style={{
                                    width: "50%"
                                }}>
                                <Image
                                    source={(this.props.user.link == null)
                                        ? require('../img/user.jpg')
                                        : {
                                            uri: this.props.user.link
                                        }}
                                    style={{
                                        width: 150,
                                        height: 150,
                                        borderRadius: 360
                                    }} />
                            </View>
                            <View
                                style={{
                                    width: "50%",
                                    alignItems: "center",
                                    justifyContent: "space-around"
                                }}>
                                <Text>
                                    {this.props.user.firstname + " " + this.props.user.lastname}
                                </Text>
                                <Text>
                                    {this.props.user.city}
                                </Text>
                                <Text>
                                    {this.props.user.email}
                                </Text>
                                {this.renderButton()}
                            </View>
                        </View>
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                            <LoadingList
                                loading={this.state.loading}
                                condition={this.state.photos.length == 0}
                                text={"Brak Postów"}
                                loadingText={"Loading"}>
                                <PhotoGrid PhotosList={this.state.photos} borderRadius={10} />
                            </LoadingList>
                        </View>
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
    onVisibleImage = img => {
        this.setState({ image: img });
        this.setState({ visible: true });
    };
    onDismissModal = () => {
        this.setState({ visible: false });
    };
    renderUser = (link) => {
        if (link == null) {
            return require('../img/user.jpg');
        }
        return { uri: link };
    }
    renderButton = () => {
        if (this.props.user.id === this.state.myId) {
            return (<Button
                iconLeft
                onPress={() => Actions.EditScene({ user: this.props.user })}
                style={{
                    alignSelf: "center"
                }}>
                <Icon
                    name={'md-create'} />
                <Text>
                    {"Edycja danych"}
                </Text>
            </Button>)
        } else {
            return (<Button
                iconLeft
                onPress={() => {
                    this.unfollow();
                }}
                style={{
                    alignSelf: "center"
                }}>
                <Icon
                    name={this.state.follow
                        ? 'md-person'
                        : 'md-person-add'} />
                <Text>
                    {this.state.follow
                        ? "Unfollow"
                        : "Follow"}
                </Text>
            </Button>)
        }
    }
    unfollow() {
        const uid = firebase
            .auth()
            .currentUser.uid;
        firebase
            .firestore()
            .doc("followers/" + uid)
            .get()
            .then((doc) => {
                var favorites = doc.data();
                console.log(favorites);
                var fav = [];
                favorites.forEach((user) => {
                    if (user.id != this.props.user.id)
                        fav.push(user);
                })
                console.log(fav);
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export default MyCollections;

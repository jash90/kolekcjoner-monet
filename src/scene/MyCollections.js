import React, {Component} from "react";
import {View, Image, ActivityIndicator} from "react-native";
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
import {PhotoGrid} from "../components/PhotoGrid";
import ModalImage from "../components/ModalImage";
import ModalLoading from '../components/ModalLoading';
import firebase from "react-native-firebase";

import LoadingList from '../components/LoadingList';

class MyCollections extends Component {
    onVisibleImage = img => {
        this.setState({image: img});
        this.setState({visible: true});
    };
    onDismissModal = () => {
        this.setState({visible: false});
    };
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

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            image: null,
            photos: [],
            posts: [],
            follow: false,
            loading: true
        };
    }

    async componentWillMount() {
        var ref = firebase
            .firestore()
            .doc("users/" + this.props.user.id);
        console.log(ref);
        const postss = [];
        var photos = [];
        this.setState({loading: true});
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
                            console.log(posts);
                        })
                        .catch((error) => {
                            console.log(error);
                            // this.setState({loading:false});
                        })

                });
            })
            . finally(() => {
                this.setState({loading: false});
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
                            }}/>
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
                                }}/>
                            </View>
                            <View
                                style={{
                                width: "50%",
                                alignItems: "center",
                                justifyContent: "space-between"
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
                                <Button
                                    iconLeft
                                    onPress={() => this.setState({
                                    follow: !this.state.follow
                                })}
                                    style={{
                                    alignSelf: "center"
                                }}>
                                    <Icon
                                        name={this.state.follow
                                        ? 'md-person'
                                        : 'md-person-add'}/>
                                    <Text>
                                        {this.state.follow
                                            ? "Unfollow"
                                            : "Follow"}
                                    </Text>
                                </Button>
                            </View>
                        </View>
                        <View
                        style={{
                            alignItems:"center",
                            justifyContent:"center"
                        }}
                        >
                        <LoadingList 
                        loading={this.state.loading}
                        condition={this.state.photos.length==0}
                        text={"Brak Postów"}
                        loadingText={"Loading"}
                        >
                         <PhotoGrid PhotosList={this.state.photos} borderRadius={10}/>
                         </LoadingList>
                         </View>
                    </Content>
                </Drawer>
            </Container>
        );
    }
    renderUser = (link) => {
        if (link == null) {
            return require('../img/user.jpg');
        }
        return {uri: link};
    }
}

export default MyCollections;

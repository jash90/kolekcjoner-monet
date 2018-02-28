import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import {
    Body,
    Button,
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
    ListItem,
    Right,
    Text,
    Thumbnail
} from "native-base";
import SideBar from "../components/SideBar";
import firebase from "react-native-firebase";
import LoadingList from '../components/LoadingList';
import { Actions } from "react-native-router-flux";
class FriendsScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            followers: [],
            loading: true,
            userId :""
        };
        this.ref = firebase
            .firestore()
            .collection("followers");
        this.storage = firebase.storage();
        this.unsubscribe = null;
    }

    componentDidMount = () => {
        this.unsubscribe = this
            .ref
            .onSnapshot(this.onCollectionUpdate);
            var user = firebase
            .auth()
            .currentUser;
      this.setState({userId:user.uid});
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    onCollectionUpdate = (querySnapshot) => {
        console.log(this.props.user);
        const followers = [];
        this.setState({ loading: true });
        firebase
            .firestore()
            .doc("followers/" + this.state.userId)
            .get()
            .then(doc => {
                const { users } = doc.data();
                users.forEach(user => {
                    user
                        .get()
                        .then(e => {
                            var user = e.data();
                            user.id = e.id;
                            firebase
                                .storage()
                                .ref(e.id + ".jpg")
                                .getDownloadURL()
                                .then(url => {

                                    user.link = url;

                                })
                                .finally(() => {
                                    followers.push(user);
                                    this.setState({ followers });
                                    this.setState({ loading: false });
                                    console.log(followers)
                                });

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
                                }} />
                        </Button>
                    </Left>
                    <Body>
                        <Text
                            style={{
                                color: "#fff"
                            }}>
                            Obserwujący
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
                            <List
                                dataArray={this.state.followers}
                                style={{
                                    width: "100%"
                                }}
                                renderRow={(item) => (
                                    <View
                                        style={{
                                            justifyContent: "flex-start",
                                            flexDirection: "row"
                                        }}>
                                        <View
                                            style={{
                                                justifyContent: "center"
                                            }}>
                                            <TouchableOpacity onPress={()=>Actions.MyCollections({user:item, followers :this.state.followers})}>
                                            <Thumbnail
                                                small
                                                source={(item.link == null)
                                                    ? require('../img/user.jpg')
                                                    : {
                                                        uri: item.link
                                                    }}
                                                style={{
                                                    margin: 10
                                                }} />
                                                </TouchableOpacity>
                                        </View>
                                        <View
                                            style={{
                                                alignItems: "flex-start",
                                                justifyContent: "center"
                                            }}>
                                            <Text>{item.firstname + " " + item.lastname}</Text>
                                            <Text note>
                                                {"Miasto: " + item.city + " Email: " + item.email}
                                            </Text>
                                        </View>
                                    </View>
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
}

export default FriendsScene;

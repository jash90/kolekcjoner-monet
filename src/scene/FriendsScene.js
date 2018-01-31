import React, {Component} from "react";
import {Platform, StyleSheet, View, Image} from "react-native";
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
import firebase from "react-native-firebase";

class FriendsScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            followers: []
        };
        this.ref = firebase
            .firestore()
            .collection("followers");
        this.storage = firebase.storage();
        this.unsubscribe = null;
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
        const followers = [];
        firebase
            .firestore()
            .doc("followers/NbcZVRCcpRWAjOsx47L7CJArCH83")
            .get()
            .then(doc => {
                const {users} = doc.data();
                users.forEach(user => {
                    user
                        .get()
                        .then(e => {
                            followers.push(e.data());
                            this.setState({followers});
                        });
                });
            });

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
                    }}>
                        Znajomi
                    </Text>
                    </Body>
                </Header>
                <Drawer
                    ref={ref => {
                        this.drawer = ref;
                    }}
                    content={< SideBar/>}
                    onClose={() => this.closeDrawer()}>
                    <Content style={{
                        backgroundColor: "#fff"
                    }}>
                        <List
                            dataArray={this.state.followers}
                            renderRow={(item) => (
                                <View
                                    style={{
                                        justifyContent: "center",
                                        flexDirection: "row",
                                        alignSelf: "flex-start"
                                    }}>
                                    <View style={{
                                        justifyContent: "center"
                                    }}>
                                        <Icon
                                            name={"ios-contact"}
                                            style={{
                                                fontSize: 60,
                                                marginLeft: 10,
                                                marginRight: 10
                                            }}/>
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
}

export default FriendsScene;

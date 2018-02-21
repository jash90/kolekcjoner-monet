import React, { Component } from "react";
import { Dimensions, ScrollView, TextInput, View } from "react-native";
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
import ImagePicker from "react-native-image-picker";
import ImagePlaceholder from "../components/ImagePlaceholder";
import firebase from 'react-native-firebase';
import ModalLoading from '../components/ModalLoading';
import { Actions } from "react-native-router-flux";

class EditScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            city:'',
            password: '',
            repeatpassword: '',
            error: '',
            loading: false
        }
    }
    componentDidMount = () => {
        const user  = this.props.user;
        this.setState({ firstname: user.firstname, lastname: user.lastname, email:user.email,city:user.city, uri:user.link});
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
                        <View
                            style={{
                                margin: 16,
                                justifyContent: 'space-around'
                            }}>
                            <View
                                style={{
                                    width: Dimensions
                                        .get("window")
                                        .width - 200,
                                    height: Dimensions
                                        .get("window")
                                        .width - 200,
                                    backgroundColor: "#fff",
                                    alignSelf: "center",
                                    marginBottom: 10
                                }}>
                                <ImagePlaceholder
                                    source={{uri : this.state.uri}}
                                    textPlaceholder="Wybierz zdjęcie"
                                />
                            </View>
                            <Form>
                                <Item floatingLabel>
                                    <Label>Imię</Label>
                                    <Input
                                        value={this.state.firstname}
                                        onChangeText={(text) => this.setState({ firstname: text })} />
                                </Item>
                                <Item floatingLabel>
                                    <Label>Nazwisko</Label>
                                    <Input
                                        value={this.state.lastname}
                                        onChangeText={(text) => this.setState({ lastname: text })} />
                                </Item>
                                <Item floatingLabel>
                                    <Label>Email</Label>
                                    <Input
                                        value={this.state.email}
                                        onChangeText={(text) => this.setState({ email: text })} />
                                </Item>
                                <Item floatingLabel>
                                    <Label>Miasto</Label>
                                    <Input
                                        value={this.state.city}
                                        onChangeText={(text) => this.setState({ city: text })} />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Hasło</Label>
                                    <Input
                                        value={this.state.password}
                                        secureTextEntry={true}
                                        onChangeText={(text) => this.setState({ password: text })} />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Powtórz hasło</Label>
                                    <Input
                                        value={this.state.repeatpassword}
                                        secureTextEntry={true}
                                        onChangeText={(text) => this.setState({ repeatpassword: text })} />
                                </Item>
                            </Form>
                            <Button
                                block
                                style={{
                                    marginTop: 20
                                }}
                                onPress={() => this.onRegister()}>
                                <Text>
                                    Zapisz
                        </Text>
                            </Button>
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
}

export default EditScene;
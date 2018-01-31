import React, {Component} from "react";
import {
    Platform,
    StyleSheet,
    View,
    TouchableOpacity,
    ToastAndroid,
    AsyncStorage,
    Switch
} from "react-native";
import {
    Container,
    Header,
    Content,
    Button,
    Form,
    Item,
    Label,
    Input,
    Icon,
    Body,
    Left,
    Text,
    Drawer
} from "native-base";
import {Actions} from "react-native-router-flux";
import ModalLoading from "../components/ModalLoading";
import firebase from "react-native-firebase";

class LoginScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            loading: false,
            error: "",
            autologin: false
        };
    }

    async saveUserID(id) {
        try {
            await AsyncStorage.setItem("@UserId:key", id);
        } catch (error) {
            console.log(error);
        }
    }

    async saveAutoLogin(autologin) {
        try {
            await AsyncStorage.setItem("@AutoLogin:key", JSON.stringify(autologin));
        } catch (error) {
            console.log(error);
        }
    }

    async saveloginhaslo(login, password) {
        try {
            await AsyncStorage.setItem("@login:key", login);
            await AsyncStorage.setItem("@password:key", password);
        } catch (error) {
            console.log(error);
        }
    }

    async componentWillMount() {
        try {
            const autologin = await AsyncStorage.getItem('@AutoLogin:key');
            if (autologin !== null) {
                this.setState({
                    autologin: JSON.parse(autologin)
                });
            }
            if (this.state.autologin) {
                const login = await AsyncStorage.getItem('@login:key');
                if (login !== null) {
                    this.setState({login});
                }
                const password = await AsyncStorage.getItem('@password:key');
                if (password !== null) {
                    this.setState({password});
                }
                //    if (this.state.login != null && this.state.password != null) {
                //       this.onLogin();
                //   }
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                    <Text style={{
                        color: "#fff"
                    }}>Kolekcjoner Monet</Text>
                    </Body>
                </Header>
                <View
                    style={{
                        margin: 16,
                        justifyContent: "space-around"
                    }}>
                    <Body style={{
                        margin: 20
                    }}>
                    <Text>Logowanie</Text>
                    </Body>
                    <Form>
                        <Item floatingLabel>
                            <Label>Login</Label>
                            <Input
                                value={this.state.login}
                                onChangeText={text => this.setState({login: text})}/>
                        </Item>
                        <Item floatingLabel last>
                            <Label>Hasło</Label>
                            <Input
                                value={this.state.password}
                                secureTextEntry={true}
                                onChangeText={text => this.setState({password: text})}/>
                        </Item>
                    </Form>
                    <ModalLoading text={"Logowanie..."} visible={this.state.loading}/>
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 20,
                            marginBottom: 10
                        }}>
                        <Switch
                            value={this.state.autologin}
                            onValueChange={(value) => this.onChangeAutoLogin(value)}
                            onTintColor="#6f7ab1"
                            thumbTintColor="#324190"/>
                        <Text>{"Pozostań zalogowany"}</Text>
                    </View>
                    <Button
                        block
                        style={{
                            marginTop: 10,
                            marginBottom: 10
                        }}
                        onPress={() => this.onLogin()}>
                        <Text>Zaloguj</Text>
                    </Button>
                    <Button block onPress={() => Actions.RegisterScene()}>
                        <Text>Zarejestruj</Text>
                    </Button>
                </View>
            </Container>
        );
    }

    onChangeAutoLogin(value) {
        this.setState({autologin: value});
        this.saveAutoLogin(value);
    }

    onLogin = () => {
        this.setState({loading: true});
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.login, this.state.password)
            .then(data => {
                this.saveUserID(data.uid);
                this.saveloginhaslo(this.state.login, this.state.password);
                ToastAndroid.show("Zalogowałes sie jako " + data.email + " .", ToastAndroid.SHORT);
                Actions.HomeScene();
                this.setState({error: "", loading: false});
            })
            .catch(error => {
                this.setState({error: "Authentication failed.", loading: false});
                ToastAndroid.show(error.message, ToastAndroid.SHORT);
            });
    };
}

export default LoginScene;

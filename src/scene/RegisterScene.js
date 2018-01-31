import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    View,
    ToastAndroid,
    Modal,
    ActivityIndicator
} from 'react-native'
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
} from 'native-base';
import firebase from 'react-native-firebase';
import {Actions} from 'react-native-router-flux';
import ModalLoading from '../components/ModalLoading';

class LoginScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            email: '',
            password: '',
            repeatpassword: '',
            error: '',
            loading: false
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                    <Text
                        style={{
                            color: '#fff'
                        }}>Kolekcjoner Monet</Text>
                    </Body>
                </Header>
                <View
                    style={{
                        margin: 16,
                        justifyContent: 'space-around'
                    }}>
                    <Body style={{
                        margin: 20
                    }}>
                    <Text>Rejestracja</Text>
                    </Body>
                    <Form>
                        <Item floatingLabel>
                            <Label>Login</Label>
                            <Input
                                value={this.state.login}
                                onChangeText={(text) => this.setState({login: text})}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input
                                value={this.state.email}
                                onChangeText={(text) => this.setState({email: text})}/>
                        </Item>
                        <Item floatingLabel last>
                            <Label>Hasło</Label>
                            <Input
                                value={this.state.password}
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({password: text})}/>
                        </Item>
                        <Item floatingLabel last>
                            <Label>Powtórz hasło</Label>
                            <Input
                                value={this.state.repeatpassword}
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({repeatpassword: text})}/>
                        </Item>
                    </Form>
                    <Button
                        block
                        style={{
                            marginTop: 20
                        }}
                        onPress={() => this.onRegister()}>
                        <Text>
                            Zarejestruj
                        </Text>
                    </Button>
                    <ModalLoading visible={this.state.loading} text={"Rejestracja..."}/>
                </View>
            </Container>
        );
    }

    onRegister() {
        if (this.state.login === '') {
            alert('Podaj Login');
            return;
        }
        if (this.state.email === '') {
            alert('Podaj Email');
            return;
        }
        if (this.state.password === '') {
            alert('Podaj Hasło');
            return;
        }
        if (this.state.repeatpassword === '') {
            alert('Powtórz Hasło');
            return;
        }
        if (!this.state.password === this.state.repeatpassword) {
            alert('Hasła muszą być takie same');
        }
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.email) === false) {
            alert('Email jest niepoprawny.');
            return;
        }
        this.setState({loading: true});
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                ToastAndroid.show('Konto ' + this.state.login + ' zostało utworzone.', ToastAndroid.SHORT);
                Actions.LoginScene();
                this.setState({error: '', loading: false});
            })
            .catch((error) => {
                this.setState({error: 'Authentication failed.', loading: false});
                ToastAndroid.show(error.message, ToastAndroid.SHORT);
            });

    }
}

export default LoginScene;
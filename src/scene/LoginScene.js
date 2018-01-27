import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  ToastAndroid
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
import { Actions } from "react-native-router-flux";
import ModalLoading from "../components/ModalLoading";
import firebase from "react-native-firebase";
class LoginScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "rafal@gg.pl",
      password: "123456",
      loading: false,
      error: ""
    };
  }
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Text
              style={{
                color: "#fff"
              }}
            >
              Kolekcjoner Monet
            </Text>
          </Body>
        </Header>
        <View
          style={{
            margin: 16,
            justifyContent: "space-around"
          }}
        >
          <Body
            style={{
              margin: 20
            }}
          >
            <Text>Logowanie</Text>
          </Body>
          <Form>
            <Item floatingLabel>
              <Label>Login</Label>
              <Input
                value={this.state.login}
                onChangeText={text => this.setState({ login: text })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Hasło</Label>
              <Input
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={text => this.setState({ password: text })}
              />
            </Item>
          </Form>
          <ModalLoading text={"Logowanie..."} visible={this.state.loading} />
          <Button
            block
            style={{
              marginTop: 10,
              marginBottom: 10
            }}
            onPress={() => this.onLogin()}
          >
            <Text>Zaloguj</Text>
          </Button>
          <Button block onPress={() => Actions.RegisterScene()}>
            <Text>Zarejestruj</Text>
          </Button>
        </View>
      </Container>
    );
  }
  onLogin = () => {
    this.setState({ loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.login, this.state.password)
      .then(data => {
        //alert(JSON.stringify(data));
        ToastAndroid.show(
          "Zalogowałes sie jako " + data.email + " .",
          ToastAndroid.SHORT
        );
        Actions.HomeScene();
        this.setState({ error: "", loading: false });
      })
      .catch(error => {
        this.setState({ error: "Authentication failed.", loading: false });
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      });
  };
}

export default LoginScene;

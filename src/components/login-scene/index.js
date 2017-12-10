import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native'
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
import {Actions} from 'react-native-router-flux';
class LoginScene extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Text style={{
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
            <Text >Logowanie</Text>
          </Body>
          <Form>
            <Item floatingLabel>
              <Label>Login</Label>
              <Input/>
            </Item>
            <Item floatingLabel last>
              <Label>Hasło</Label>
              <Input/>
            </Item>
          </Form>
          <Button
            block
            style={{
            marginTop: 10,
            marginBottom: 10
          }}
            onPress={() => Actions.HomeScene()}>
            <Text>
              Zaloguj
            </Text>
          </Button>
          <Button block>
            <Text>
              Zarejestruj
            </Text>
          </Button>
        </View>
      </Container>
    );
  }
}

export default LoginScene;
import React, {Component} from 'react';
import {Platform, StyleSheet, View, TouchableOpacity} from 'react-native'
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
  constructor(props){
    super(props);
    this.state={
      login:'rafal',
      password:'123456'
    }
  }
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
              <Input value={this.state.login} onChangeText={(text)=>this.setState({login:text})}/>
            </Item>
            <Item floatingLabel last>
              <Label>Hasło</Label>
              <Input value={this.state.password} secureTextEntry={true} onChangeText={(text)=>this.setState({password:text})}/>
            </Item>
          </Form>
          <Button
            block
            style={{
            marginTop: 10,
            marginBottom: 10
          }}
          onPress={()=> this.onLogin()}
           >
            <Text>
              Zaloguj
            </Text>
          </Button>
          <Button block onPress={()=> Actions.RegisterScene()}>
            <Text>
              Zarejestruj
            </Text>
          </Button>
        </View>
      </Container>
    );
  }
  onLogin=()=>{
    if (this.state.login!='rafal'){
      alert('Niepoprawny Login lub Hasło.');
      return;
    }

    if (this.state.password!='123456'){
      alert('Niepoprawny Login lub Hasło.');
      return;
    }
    Actions.HomeScene();
  }
}

export default LoginScene;
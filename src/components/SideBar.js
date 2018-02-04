import React, {Component} from 'react';
import {AsyncStorage} from 'react-native'
import {
  Body,
  Button,
  Container,
  Content,
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
  Switch,
  Text
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import firebase from 'react-native-firebase';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      user: null
    };
  }

  async componentWillMount() {
    try {
      const value = await AsyncStorage.getItem('@UserId:key');
      if (value !== null) {
        this.setState({userId: value});
        firebase
          .firestore()
          .doc("users/" + value)
          .get()
          .then((u) => {
            var user = u.data();
            user.id = u.id;
            firebase
              .storage()
              .ref(u.id + ".jpg")
              .getDownloadURL()
              .then(url => {

                user.link = url;

              })
              . finally(() => {
                this.setState({user});
                console.log(user);
              });

          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return <Container>
      <Content style={{
        backgroundColor: "#fff"
      }}>
        <List>
          <ListItem icon onPress={() => Actions.SendScene({user: this.state.user})}>
            <Left>
              <Icon name="ios-send"/>
            </Left>
            <Body>
              <Text>Wyślij zdjęcie</Text>
            </Body>
          </ListItem>
          <ListItem itemDivider/>
          <ListItem icon onPress={() => Actions.HomeScene({user: this.state.user})}>
            <Left>
              <Icon name="ios-list"/>
            </Left>
            <Body>
              <Text>Przeglądaj</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={() => Actions.FriendsScene({user: this.state.user})}>
            <Left>
              <Icon name="ios-contacts"/>
            </Left>
            <Body>
              <Text>Twoi obserwujący</Text>
            </Body>
          </ListItem>
          <ListItem itemDivider/>
          <ListItem icon onPress={() => Actions.MyCollections({user: this.state.user})}>
            <Left>
              <Icon name="ios-contact"/>
            </Left>
            <Body>
              <Text>Moja kolekcja</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={() => Actions.FavoritesScene({user: this.state.user})}>
            <Left>
              <Icon name="ios-heart"/>
            </Left>
            <Body>
              <Text>Ulubione kolekcje</Text>
            </Body>
          </ListItem>
          <ListItem itemDivider/>
          <ListItem icon onPress={() => Actions.LoginScene()}>
            <Left>
              <Icon name="exit"/>
            </Left>
            <Body>
              <Text>Wyloguj</Text>
            </Body>
          </ListItem>
        </List>
      </Content>
    </Container>;
  }
}

export default SideBar;
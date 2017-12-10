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
  List,
  ListItem,
  Text,
  Right,
  Switch
} from 'native-base';
import {Actions} from 'react-native-router-flux';
var items = ['dolar', 'euro', 'zloty'];
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <Content style={{
          backgroundColor: '#fff'
        }}>
          <List>
            <ListItem icon onPress={()=>Actions.HomeScene()}>
              <Left>
                <Icon name="ios-list"/>
              </Left>
              <Body>
                <Text>Przeglądaj</Text>
              </Body>
            </ListItem>
            <ListItem icon onPress={()=>Actions.FriendsScene()}>
              <Left>
                <Icon name="ios-contacts"/>
              </Left>
              <Body>
                <Text>Twoi znajomi</Text>
              </Body>
            </ListItem>
            <ListItem itemDivider/>
            <ListItem icon onPress={()=>Actions.MyCollections()}>
              <Left>
                <Icon name="ios-contact"/>
              </Left>
              <Body>
                <Text>Moja kolekcja</Text>
              </Body>
            </ListItem>
            <ListItem icon onPress={()=>Actions.FavoritesScene()}>
              <Left>
                <Icon name="ios-heart"/>
              </Left>
              <Body>
                <Text>Ulubione kolekcje</Text>
              </Body>
            </ListItem>
            <ListItem itemDivider/>
              <ListItem icon onPress={()=>Actions.LoginScene()}>
                <Left>
                  <Icon name="exit"/>
                </Left>
                <Body>
                  <Text>Wyloguj</Text>
                </Body>
              </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
export default SideBar;
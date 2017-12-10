import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image} from 'react-native'
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
} from 'native-base';
import SideBar from './SideBar';
import user from './../img/logo.png';
import collection from './../img/drawer-cover.png';
var items= ['Bartek','Justyna','Rafał', 'Marek', 'Wojtek'];
class FriendsScene extends Component {
  render() {
    return (
      <Container>
        <Header >
          <Left>
            <Button transparent onPress={() => this.openDrawer()}><Icon name={'ios-menu'} style={{
        color: '#fff'
      }}/></Button>
          </Left>
          <Body>
            <Text style={{
              color: '#fff'
            }}>Znajomi</Text>
          </Body>
        </Header>
        <Drawer
          ref={(ref) => {
          this.drawer = ref;
        }}
          content={< SideBar />}
          onClose={() => this.closeDrawer()}>
          <Content style={{backgroundColor:'#fff'}}>
            <List
              dataArray={items}
              renderRow={(item) =>  <View style={{justifyContent:'center', flexDirection:'row',  alignSelf:'flex-start'}}>
              <View style={{justifyContent:'center',}}>
                  <Icon name={'ios-contact'} style={{fontSize:60, marginLeft:10, marginRight:10}}/>
                  </View>
                  <View style={{alignItems:'flex-start',justifyContent:'center'}}>
                  <Text>{item}</Text>
                  <Text note>Kolekcja Starych Monet, Monety z II Wojny Światowej</Text>
                  </View>
                </View>}/>
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
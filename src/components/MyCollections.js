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
  Card,
  CardItem,
  Thumbnail,
  List
} from 'native-base';
import SideBar from './SideBar';
import user from './../img/logo.png';
import collection from './../img/drawer-cover.png';
import PhotoGrid from 'react-native-thumbnail-grid';
var items= ['sdfs','123','shdfgsjd'];
const images = [
  'https://cdn.pixabay.com/photo/2017/06/09/09/39/adler-2386314_960_720.jpg',
  'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029_960_720.jpg',
  'https://cdn.pixabay.com/photo/2016/08/12/22/34/apple-1589869_960_720.jpg'
]
class MyCollections extends Component {
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
            }}>Moja kolekcja</Text>
          </Body>
        </Header>
        <Drawer
          ref={(ref) => {
          this.drawer = ref;
        }}
          content={< SideBar />}
          onClose={() => this.closeDrawer()}>
          <Content>
            <View style={{justifyContent:'center', alignSelf:'center'}}>
            <Icon name={'ios-contact'} style={{fontSize:150}}/>
            <View style={{alignItems:'center'}}>
            <Text>Imię i Nazwisko</Text>
            </View>
            </View>
            <PhotoGrid source={images} onPressImage={source => this.showImage(source.uri)} />
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

export default MyCollections;
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
import SideBar from '../components/SideBar';
import user from '../img/logo.png';
import collection from '../img/drawer-cover.png';
import PhotoGrid from 'react-native-thumbnail-grid';
var items = ['sdfs', '123', 'shdfgsjd'];
const images = [
  'https://mennicazlota.pl/media/catalog/product/cache/16/image/9df78eab33525d08d6e' +
      '5fb8d27136e95/k/r/krugerand_1oz_a.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/George_Washington_Pres' +
      'idential_%241_Coin_obverse.png/480px-George_Washington_Presidential_%241_Coin_ob' +
      'verse.png',
  'https://www.apmex.com/handlers/ThumbJpeg.ashx?VFilePath=~/Resources/Catalog%20Im' +
      'ages/Products/28432_Obv.jpg&width=300&height=300',
  'https://d-w24.ppstatic.pl/g2/81/f4/f8/142385_1276095334_02a6_p.jpeg',
  'https://mennicazlota.pl/media/catalog/product/cache/16/image/9df78eab33525d08d6e' +
      '5fb8d27136e95/1/b/1b_11_2.jpg'
];
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
            <View
              style={{
              justifyContent: 'center',
              alignSelf: 'center'
            }}>
              <Thumbnail
                large
                source={this.props.image
                ? this.props.image
                : user}/>
              <View style={{
                alignItems: 'center'
              }}>
                <Text>Imię i Nazwisko</Text>
              </View>
            </View>
            <PhotoGrid
              source={images}
              style={{
              backgroundColor: '#fff'
            }}
              imageStyle={{
              backgroundColor: '#fff'
            }}
              imageProps={{
              resizeMethod: 'scale',
              resizeMode: 'contain'
            }}/>
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
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
var items = ['sdfs', '123', 'shdfgsjd'];
class FavoritesScene extends Component {
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
            }}>Ulubione Monety</Text>
          </Body>
        </Header>
        <Drawer
          ref={(ref) => {
          this.drawer = ref;
        }}
          content={< SideBar />}
          onClose={() => this.closeDrawer()}>
          <Content>
            <List
              dataArray={items}
              renderRow={(item) => <Card style={{
              flex: 0
            }}>
              <CardItem>
                <Left>
                  <Thumbnail source={user}/>
                  <Body>
                    <Text>NativeBase</Text>
                    <Text note>April 15, 2016</Text>
                  </Body>
                </Left>
                <Right>
                  <Text>11h ago</Text>
                </Right>
              </CardItem>
              <CardItem cardBody>
                <Body>
                  <Image
                    source={collection}
                    style={{
                    width: '95%',
                    height: 200,
                    alignSelf: 'center',
                    flex: 1
                  }}/>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent>
                    <Icon active name="thumbs-up"/>
                    <Text>12 Likes</Text>
                  </Button>
                </Left>
                <Body>
                  <Button transparent>
                    <Icon active name="chatbubbles"/>
                    <Text>4 Comments</Text>
                  </Button>
                </Body>
              </CardItem>
            </Card>}/>
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

export default FavoritesScene;
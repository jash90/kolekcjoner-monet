import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Modal,
  TouchableOpacity
} from 'react-native'
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
var items = ['11', '111', '11', 'ss', 'sss'];
import moneta1 from '../img/monety/moneta1.jpg';
import moneta2 from '../img/monety/moneta2.jpg';
import moneta3 from '../img/monety/moneta3.jpg';
import moneta4 from '../img/monety/moneta4.jpg';
import moneta5 from '../img/monety/moneta5.jpg';
import user1 from '../img/kontakty/atul.png';
import user2 from '../img/kontakty/megha.png';
import user3 from '../img/kontakty/himanshu.png';
import user4 from '../img/kontakty/pratik.png';
import user5 from '../img/kontakty/sanket.png';
import user6 from '../img/kontakty/sankhadeep.png';
import {Actions} from 'react-native-router-flux';
import ImageViewer from 'react-native-image-view';
const images = [
  {
    src: '../../img/moneta1.png'
  }, {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
  }, {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
  }
]
class HomeScene extends Component {
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
            }}>Kolekcjoner Monet</Text>
          </Body>
        </Header>
        <Drawer
          ref={(ref) => {
          this.drawer = ref;
        }}
          content={< SideBar />}
          onClose={() => this.closeDrawer()}>
          <Content>
            <List>
              <Card style={{
                flex: 1
              }}>
                <CardItem>
                  <TouchableOpacity onPress={() => Actions.MyCollections({image: user1})}>
                    <View
                      style={{
                      flex: 1,
                      marginRight: 10
                    }}>
                      <Thumbnail small source={user1}/>
                    </View>
                  </TouchableOpacity>
                  <Body>
                    <Text>Marek Janusz</Text>
                    <Text note style={{
                      fontSize: 12
                    }}>12 listopada 2017</Text>
                  </Body>

                  <Right>
                    <Text>
                      11 minut temu
                    </Text>
                  </Right>
                </CardItem>

                <CardItem cardBody>
                  <TouchableOpacity
                    style={{
                    flex: 1
                  }}
                    onPress={() => Actions.PostDetails({image: moneta1, user: user1})}>
                    <View style={{
                      flex: 1
                    }}>
                      <Image
                        resizeMethod={'scale'}
                        resizeMode={'contain'}
                        source={moneta1}
                        style={{
                        width: '95%',
                        height: 200,
                        alignSelf: 'center',
                        flex: 1
                      }}/>
                    </View>
                  </TouchableOpacity>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent>
                      <Icon name="thumbs-up"/>
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
                <CardItem>
                  <Left>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu neque
                      gravida, euismod libero vel, auctor ligula.</Text>
                  </Left>
                </CardItem>
              </Card>
              <Card style={{
                flex: 1
              }}>
                <CardItem>
                  <TouchableOpacity onPress={() => Actions.MyCollections({image: user2})}>
                    <View
                      style={{
                      flex: 1,
                      marginRight: 10
                    }}>
                      <Thumbnail small source={user2}/>
                    </View>
                  </TouchableOpacity>
                  <Body>
                    <Text>Asmir</Text>
                    <Text note style={{
                      fontSize: 12
                    }}>12 listopada 2017</Text>
                  </Body>

                  <Right>
                    <Text>
                      20 minut temu
                    </Text>
                  </Right>
                </CardItem>

                <CardItem cardBody>
                  <TouchableOpacity
                    style={{
                    flex: 1
                  }}
                    onPress={() => Actions.PostDetails({image: moneta2, user: user2})}>
                    <View style={{
                      flex: 1
                    }}>
                      <Image
                        resizeMethod={'scale'}
                        resizeMode={'contain'}
                        source={moneta2}
                        style={{
                        width: '95%',
                        height: 200,
                        alignSelf: 'center',
                        flex: 1
                      }}/>
                    </View>
                  </TouchableOpacity>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent>
                      <Icon name="thumbs-up"/>
                      <Text>20 Likes</Text>
                    </Button>
                  </Left>
                  <Body>
                    <Button transparent>
                      <Icon active name="chatbubbles"/>
                      <Text>5 Comments</Text>
                    </Button>
                  </Body>
                </CardItem>
                <CardItem>
                  <Left>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu neque
                      gravida, euismod libero vel, auctor ligula.</Text>
                  </Left>
                </CardItem>
              </Card>
              <Card style={{
                flex: 1
              }}>
                <CardItem>
                  <TouchableOpacity onPress={() => Actions.MyCollections({image: user3})}>
                    <View
                      style={{
                      flex: 1,
                      marginRight: 10
                    }}>
                      <Thumbnail small source={user3}/>
                    </View>
                  </TouchableOpacity>
                  <Body>
                    <Text>Amir</Text>
                    <Text note style={{
                      fontSize: 12
                    }}>12 listopada 2017</Text>
                  </Body>

                  <Right>
                    <Text>
                      33 minut temu
                    </Text>
                  </Right>
                </CardItem>

                <CardItem cardBody>
                  <TouchableOpacity
                    style={{
                    flex: 1
                  }}
                    onPress={() => Actions.PostDetails({image: moneta3, user: user3})}>
                    <View style={{
                      flex: 1
                    }}>
                      <Image
                        resizeMethod={'scale'}
                        resizeMode={'contain'}
                        source={moneta3}
                        style={{
                        width: '95%',
                        height: 200,
                        alignSelf: 'center',
                        flex: 1
                      }}/>
                    </View>
                  </TouchableOpacity>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent>
                      <Icon name="thumbs-up"/>
                      <Text>33 Likes</Text>
                    </Button>
                  </Left>
                  <Body>
                    <Button transparent>
                      <Icon active name="chatbubbles"/>
                      <Text>44 Comments</Text>
                    </Button>
                  </Body>
                </CardItem>
                <CardItem>
                  <Left>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu neque
                      gravida, euismod libero vel, auctor ligula.</Text>
                  </Left>
                </CardItem>
              </Card>
              <Card style={{
                flex: 1
              }}>
                <CardItem>
                  <TouchableOpacity onPress={() => Actions.MyCollections({image: user4})}>
                    <View
                      style={{
                      flex: 1,
                      marginRight: 10
                    }}>
                      <Thumbnail small source={user4}/>
                    </View>
                  </TouchableOpacity>
                  <Body>
                    <Text>Ahmed</Text>
                    <Text note style={{
                      fontSize: 12
                    }}>12 listopada 2017</Text>
                  </Body>
                  <Right>
                    <Text>
                      41 minut temu
                    </Text>
                  </Right>
                </CardItem>
                <CardItem cardBody>
                  <TouchableOpacity
                    style={{
                    flex: 1
                  }}
                    onPress={() => Actions.PostDetails({image: moneta4, user: user4})}>
                    <View style={{
                      flex: 1
                    }}>
                      <Image
                        resizeMethod={'scale'}
                        resizeMode={'contain'}
                        source={moneta4}
                        style={{
                        width: '95%',
                        height: 200,
                        alignSelf: 'center',
                        flex: 1
                      }}/>
                    </View>
                  </TouchableOpacity>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent>
                      <Icon name="thumbs-up"/>
                      <Text>22 Likes</Text>
                    </Button>
                  </Left>
                  <Body>
                    <Button transparent>
                      <Icon active name="chatbubbles"/>
                      <Text>43 Comments</Text>
                    </Button>
                  </Body>
                </CardItem>
                <CardItem>
                  <Left>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu neque
                      gravida, euismod libero vel, auctor ligula.</Text>
                  </Left>
                </CardItem>
              </Card>
              <Card style={{
                flex: 1
              }}>
                <CardItem>
                  <TouchableOpacity onPress={() => Actions.MyCollections({image: user5})}>
                    <View
                      style={{
                      flex: 1,
                      marginRight: 10
                    }}>
                      <Thumbnail small source={user5}/>
                    </View>
                  </TouchableOpacity>
                  <Body>
                    <Text>Hamir</Text>
                    <Text note style={{
                      fontSize: 12
                    }}>12 listopada 2017</Text>
                  </Body>

                  <Right>
                    <Text>
                      55 minut temu
                    </Text>
                  </Right>
                </CardItem>

                <CardItem cardBody>
                  <TouchableOpacity
                    style={{
                    flex: 1
                  }}
                    onPress={() => Actions.PostDetails({image: moneta5, user: user5})}>
                    <View style={{
                      flex: 1
                    }}>
                      <Image
                        resizeMethod={'scale'}
                        resizeMode={'contain'}
                        source={moneta5}
                        style={{
                        width: '95%',
                        height: 200,
                        alignSelf: 'center',
                        flex: 1
                      }}/>
                    </View>
                  </TouchableOpacity>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent>
                      <Icon name="thumbs-up"/>
                      <Text>133 Likes</Text>
                    </Button>
                  </Left>
                  <Body>
                    <Button transparent>
                      <Icon active name="chatbubbles"/>
                      <Text>42 Comments</Text>
                    </Button>
                  </Body>
                </CardItem>
                <CardItem>
                  <Left>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu neque
                      gravida, euismod libero vel, auctor ligula.</Text>
                  </Left>
                </CardItem>
              </Card>
            </List>
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

export default HomeScene;
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
import firebase from 'react-native-firebase';
import Moment from 'moment';
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
  constructor(props) {
    super(props);
    this.ref = firebase
      .firestore()
      .collection('posts');
    this.unsubscribe = null;
    this.state = {
      loading: true,
      todos: [],
      image:null,
    };
  }
  componentDidMount() {
    this.unsubscribe = this
      .ref
      .onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  onCollectionUpdate = (querySnapshot) => {
    const todos = [];
    querySnapshot.forEach((doc) => {
      const {idusers, likes, comments, description, dateupdate} = doc.data();
      todos.push({
        key: doc.id,
        idusers,
        likes,
        comments,
        description,
        dateupdate,
      });

    });

    this.setState({todos, loading: false});
   // console.log(this.state.todos);
  }
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
            <List
              dataArray={this.state.todos}
              renderRow={(item) => <Card style={{
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
                  <Text>{this.getUserName(item.idusers)}</Text>
                  <Text note style={{
                    fontSize: 12
                  }}>{Moment(item.dateupdate).format("DD.MM.YYYY")}</Text>
                </Body>
                <Right>
                  <Text>
                  {Moment(item.dateupdate).format("DD.MM.YYYY")}
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
                      source={{uri : item.image}}
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
                    <Icon active name="thumbs-up"/>
                    <Text>{item.likes.length+" Likes"}</Text>
                  </Button>
                </Left>
                <Body>
                  <Button transparent>
                    <Icon active name="chatbubbles"/>
                    <Text>{item.comments.length+" Comments"}</Text>
                  </Button>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Text>{item.description}</Text>
                </Left>
              </CardItem>
            </Card>}></List>
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
  getImage = () => {
    firebase
    .storage()
    .ref('sktPo3TmvS2Do1a2fiZH.jpg')
    .getDownloadURL()
    .then((url) => {
      this.setState({image :url});
    });
  };
getUserName = (id) => {

    firebase.firestore()
  .doc('users/'+id.id)
  .get()
  .then(documentSnapshot => {
    var user = documentSnapshot.data();
  return user.firstname + " "+user.lastname;
  });
  };
}

export default HomeScene;
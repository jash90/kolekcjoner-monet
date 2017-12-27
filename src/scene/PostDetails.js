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
var items = [
    {
        url: user1,
        text: 'super'
    }, {
        url: user2,
        text: 'ładna moneta'
    }, {
        url: user3,
        text: 'dobre'
    }, {
        url: user4,
        text: '10/10'
    }, {
        url: user5,
        text: 'fajne'
    }, {
        url: user6,
        text: 'jest git'
    }
];
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
                        <Text
                            style={{
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
                        <Card style={{
                            flex: 1
                        }}>
                            <CardItem>
                                <Left>
                                    <Thumbnail small source={this.props.user}/>
                                    <Body>
                                        <Text>Marek Janusz</Text>
                                        <Text
                                            note
                                            style={{
                                            fontSize: 12
                                        }}>12 listopada 2017</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <Text>
                                        11 minut temu
                                    </Text>
                                </Right>
                            </CardItem>
                            <CardItem cardBody>
                                <Body>
                                    <Image
                                        resizeMethod={'scale'}
                                        resizeMode={'contain'}
                                        source={this.props.image}
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
                            <CardItem>
                                <Left>
                                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu neque
                                        gravida, euismod libero vel, auctor ligula.</Text>
                                </Left>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Thumbnail
                                        small
                                        source={this.props.user}
                                        style={{
                                        marginRight: 10
                                    }}/>
                                    <Input
                                        placeholder={'Dodaj Komentarz...'}
                                        style={{
                                        backgroundColor: '#fafafa',
                                        borderRadius: 20
                                    }}/>
                                </Left>
                            </CardItem>
                            <List
                                dataArray={items}
                                renderRow={(item) => <CardItem>
                                <Left>
                                    <Thumbnail
                                        small
                                        source={item.url}
                                        style={{
                                        marginRight: 10
                                    }}/>
                                    <Text>
                                        {item.text}
                                    </Text>
                                </Left>
                            </CardItem>}/>
                        </Card>
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
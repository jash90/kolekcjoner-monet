import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Router, Stack, Scene, Actions} from 'react-native-router-flux';
import LoginScene from './src/scene/LoginScene';
import HomeScene from './src/scene/HomeScene';
import FriendsScene from './src/scene/FriendsScene';
import FavoritesScene from './src/scene/FavoritesScene';
import MyCollections from './src/scene/MyCollections';
import RegisterScene from './src/scene/RegisterScene';
import PostDetails from './src/scene/PostDetails';
import SendScene from './src/scene/SendScene';
import EditScene from './src/scene/EditScene';
class App extends Component {
  render() {
    return (
      <Router backAndroidHandler={() => Actions.pop()}>
        <Stack key="root">
          <Scene key="LoginScene" component={LoginScene} hideNavBar/>
          <Scene key="HomeScene" component={HomeScene} hideNavBar/>
          <Scene key="FriendsScene" component={FriendsScene} hideNavBar/>
          <Scene key="FavoritesScene" component={FavoritesScene} hideNavBar/>
          <Scene key="MyCollections" component={MyCollections} hideNavBar/>
          <Scene key='RegisterScene' component={RegisterScene} hideNavBar/>
          <Scene key='PostDetails' component={PostDetails} hideNavBar/>
          <Scene key='SendScene' component={SendScene} hideNavBar/>
          <Scene key='EditScene' component={EditScene} hideNavBar />
        </Stack>
      </Router>
    );
  }
}
export default App;

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';
import LoginScene from './src/scene/LoginScene';
import HomeScene from './src/scene/HomeScene';
import FriendsScene from './src/scene/FriendsScene';
import FavoritesScene from './src/scene/FavoritesScene';
import MyCollections from './src/scene/MyCollections';
import RegisterScene from './src/scene/RegisterScene';
import PostDetails from './src/scene/PostDetails'; 
class App extends Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="LoginScene" component={LoginScene} hideNavBar/>
          <Scene key="HomeScene" component={HomeScene} hideNavBar/>
          <Scene key="FriendsScene" component={FriendsScene} hideNavBar/>
          <Scene key="FavoritesScene" component={FavoritesScene} hideNavBar/>
          <Scene key="MyCollections" component={MyCollections} hideNavBar/>
          <Scene key='RegisterScene' component={RegisterScene} hideNavBar/>
          <Scene key='PostDetails' component={PostDetails} hideNavBar/>
        </Stack>
      </Router>);
  }
}
export default App;

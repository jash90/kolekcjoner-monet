import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';
import LoginScene from '@components/login-scene';
import HomeScene from '@components/home-scene';
import FriendsScene from './src/components/FriendsScene';
import FavoritesScene from './src/components/FavoritesScene';
import MyCollections from './src/components/MyCollections';
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
        </Stack>
      </Router>);
  }
}
export default App;

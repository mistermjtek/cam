
console.disableYellowBox = true;
import React from 'react';
import {
  Navigator
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers';
import Menu from './Menu';
import Camera from './Camera';
import History from './History';

const ROUTES = {
  Menu,
  Camera,
  History
};

const store = createStore(rootReducer);

export default class Main extends React.Component {


  render() {
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{ title: 'Menu' }}
          configureScene={this.configureScene}
          renderScene={(route, navigator) => {
            let Component = ROUTES[route.title];
            return (<Component navigator={navigator} />);
          }}
        />
      </Provider>
    );
  }

  configureScene(route) {
    return Navigator.SceneConfigs.PushFromRight
  }
}

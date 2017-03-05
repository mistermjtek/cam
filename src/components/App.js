
console.disableYellowBox = true;
import React from 'react';
import {
  Navigator
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers';
import Menu from './Menu';
import Capture from './Capture';
import History from './History';
import PictureDetail from '../containers/PictureDetail';

const ROUTES = {
  Menu,
  Capture,
  History,
  PictureDetail
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

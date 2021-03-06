
console.disableYellowBox = true;
import React from 'react';
import {
  Navigator
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers';
import Splash from './Splash';
import Menu from './Menu';
import History from './History';
import Capture from '../containers/Capture';
import PictureDetail from '../containers/PictureDetail';

const ROUTES = {
  Menu,
  Capture,
  History,
  PictureDetail
};

const store = createStore(rootReducer);

export default class Main extends React.Component {
constructor(props){
    super(props);
    this.state = {
      timePassed: false
    };
  }

  render() {
    setTimeout(() => {this.setState({timePassed: true})}, 4000);
    if (!this.state.timePassed){
      return <Splash />;
    } else {
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{ title: 'Menu' }}
          configureScene={this.configureScene}
          renderScene={(route, navigator) => {
            let Component = ROUTES[route.title];
            return (<Component navigator={navigator} lastView={route.lastView} />);
          }}
        />
      </Provider>
    );
    }
  }

  configureScene(route) {
    return Navigator.SceneConfigs.PushFromRight
  }
}

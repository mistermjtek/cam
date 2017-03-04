import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

export default class Menu extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={() => this.props.navigator.push({ title: 'Camera' })}
          >
          <Text>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigator.push({ title: 'History' })}
          >
          <Text>History</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

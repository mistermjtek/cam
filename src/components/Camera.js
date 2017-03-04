import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

export default class Camera extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={this.props.navigator.pop}
          >
          <Text>back</Text>
        </TouchableOpacity>
        <Text>Camera</Text>
      </View>
    );
  }
}

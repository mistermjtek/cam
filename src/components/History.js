import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

export default class History extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={this.props.navigator.pop}
          >
          <Text>back</Text>
        </TouchableOpacity>
        <Text>History</Text>
      </View>
    );
  }
}

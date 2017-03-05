import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Easing,
  Animated,
  Dimensions
} from 'react-native';

let { height, width } = Dimensions.get('window');

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraScale: new Animated.Value(0.1),
      clockScale: new Animated.Value(0.1),
      clockRotation: new Animated.Value(0)
    };
  }

  render() {

    const clockRotation = this.state.clockRotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['360deg', '0deg']
    })

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 50, marginBottom: 20 }}>CAM</Text>
        <View style={{ width, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => this.props.navigator.push({ title: 'Capture' })}
            >
            <Animated.Image
              style={{ height: 90, width: 90, transform: [{ scale: this.state.cameraScale }] }}
              source={require('../assets/camera.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigator.push({ title: 'History' })}
            >
            <Animated.Image
              style={{ height: 100, width: 100, transform: [{ rotate: clockRotation }, { scale: this.state.clockScale }] }}
              source={require('../assets/history.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(this.state.cameraScale, {
          toValue: 1,
          easing: Easing.elastic(),
          duration: 600
        }),
        Animated.timing(this.state.clockScale, {
          toValue: 1,
          duration: 600
        }),
        Animated.timing(this.state.clockRotation, {
          toValue: 1,
          duration: 600
        })
      ]).start();
    }, 200);
  }
}

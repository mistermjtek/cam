import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Easing,
  Animated,
  Dimensions,
  StyleSheet
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
      <View style={styles.container}>
        <Text style={styles.logo}>CAM</Text>
        <Text style={styles.title}>Take a picture and find out the price</Text>
        <View style={styles.logoContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigator.push({ title: 'Capture' })}
            >
            <Animated.Image
              style={{ height: 100, width: 100, transform: [{ scale: this.state.cameraScale }] }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495e'
  },
  logoContainer: { 
    width, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    flexGrow: 1
  },
  logo: {
    fontSize: 50, 
    marginBottom: 20 
  },
  title: {
    color: '#FFF',
    marginTop: 10,
    width: 160,
    textAlign: 'center'
  }
})

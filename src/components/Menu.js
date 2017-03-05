import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Easing,
  Animated,
  Dimensions,
  StyleSheet,
  StatusBar
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
        <StatusBar
          animated={true}
          barStyle="dark-content"
        />
        <View style={styles.logoContainer}>
        <Text style={styles.logo}>CAM</Text>
        <Text style={styles.title}>Take a picture and find out the price</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            onPress={() => this.props.navigator.push({ title: 'Capture' })}
            style={styles.buttonStyle}>
            <Animated.Image
              style={{ height: 30, width: 30, transform: [{ scale: this.state.cameraScale }] }}
              source={require('../assets/camera.png')}
            />
            <Text style={styles.buttonText}>Take a Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigator.push({ title: 'History' })}
            style={styles.buttonStyle}>
            <Animated.Image
              style={{ height: 30, width: 30, transform: [{ rotate: clockRotation }, { scale: this.state.clockScale }] }}
              source={require('../assets/history.png')}
            />
            <Text style={styles.buttonText}>View Photo History</Text>
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
    justifyContent: 'center', 
    alignItems: 'center',
    flexGrow: 1
  },
  logo: {
    fontSize: 50, 
    marginBottom: 20,
    color: '#FFF'
  },
  title: {
    color: '#FFF',
    marginTop: 10,
    width: 160,
    textAlign: 'center'
  },
  buttonContainer: {
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: 60,
    marginBottom: 25,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 15,
    borderRadius: 10
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF'
  }
})

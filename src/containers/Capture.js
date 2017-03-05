import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import shortid from 'shortid';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Modal
} from 'react-native';

import Camera from 'react-native-camera';

let { height, width } = Dimensions.get('window');
import { setCaptureState, setSelectedPicture } from '../actions';

class Capture extends React.Component {
  componentWillMount() {
    this.confirmButtonOpacity = new Animated.Value(0);
  }

  render() {
    console.log('this.props.capture.fetchingData', this.props.capture.fetchingData)
    let { imagePath } = this.props.capture;
    let Background = imagePath ? (
      <Image
        style={styles.image}
        source={{ uri: imagePath }}
      />
    ) : (
      <Camera
        style={styles.camera}
        ref={ref => this.camera = ref}
        aspect={Camera.constants.Aspect.fill}
        captureTarget={Camera.constants.CaptureTarget.disk}
      />
    );

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {Background}
        </View>
        <View style={styles.controlPanel}>
          <View style={styles.f1}>
            <TouchableOpacity
              onPress={() => this.cancel()}
              >
              <Text style={styles.sideButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.f1}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.takePicture()}
              >
              <View style={styles.innerButtonCircle} />
            </TouchableOpacity>
          </View>
          <View style={styles.f1}>
            <TouchableOpacity
              onPress={() => this.confirm()}
              >
              <Animated.Text style={[styles.sideButton, { opacity: this.confirmButtonOpacity }]}>
                Confirm
              </Animated.Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          visible={this.props.capture.fetchingData === true}
          animationType="fade"
          style={{ flex: 1 }}
          transparent={true}
          >
          <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator
              animating={true}
              size="large"
            />
          </View>
        </Modal>
      </View>
    );
  }

  takePicture() {
    let { imagePath } = this.props.capture;
    if (imagePath) {
      return null
    }
    this.camera.capture()
      .then(data => {
        this.props.setState({ imagePath: data.path })
        this.toggleConfirmButton(1);
      })
      .catch(err => console.error(err));
  }

  cancel() {
    if (this.props.capture.imagePath) {
      this.toggleConfirmButton(0);
      this.props.setState({ imagePath: '' });
    } else {
      this.props.navigator.pop();
    }
  }

  toggleConfirmButton(toValue) {
    Animated.timing(this.confirmButtonOpacity, {
      toValue
    }).start();
  }

  getImageFormData(img) {
    const formData = new FormData();

    formData.append("file", { uri: img, type: "image/jpg" });
    return formData;
  }

  confirm() {
    if (this.props.capture.imagePath) {
      this.props.setState({ fetchingData: true });
      this.props.setSelectedPicture(null)
      this
      fetch('https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories,Description', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Ocp-Apim-Subscription-Key': '6f78b17610934d4d92064d76d5ba6d19'
        },
        body: this.getImageFormData(this.props.capture.imagePath)
      })
        .then((response) => response.json())
        .then((responseJson) => {
          let storeObj = {'id': shortid.generate(), 'date': new Date(), 'name': responseJson.description.captions[0].text, imagePath: this.props.capture.imagePath};
          AsyncStorage.setItem(storeObj.id, JSON.stringify(storeObj), err => {
            if (err) {
              alert('Error storing values in local store');
            }
            this.props.setState({ fetchingData: false });
            storeObj.date += '';
            this.props.setSelectedPicture(storeObj);
            this.props.navigator.push({ title: 'PictureDetail' });
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height,
    width
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  controlPanel: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    marginTop: -70
  },
  button: {
    backgroundColor: '#fff',
    height: 60,
    width: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerButtonCircle: {
    height: 50,
    width: 50,
    borderRadius: 50,
    borderWidth: 3
  },
  f1: {
    flex: 1,
    alignItems: 'center'
  },
  sideButton: {
    fontSize: 20,
    color: '#fff'
  }
});

function mapStateToProps({ capture }) {
  return {
    capture
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setState: setCaptureState,
    setSelectedPicture
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Capture);

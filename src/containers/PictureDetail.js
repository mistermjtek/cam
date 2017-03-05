import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  View,
  Image,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from  'react-native';

let { height, width } = Dimensions.get('window');


class PictureDetail extends React.Component {
  render() {
    let { name, date, imagePath } = this.props.selectedPicture;

    return (
      <View style={{ backgroundColor: 'white' }}>
        <Image
          style={{ height, width, position: 'absolute' }}
          source={{ uri: imagePath }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(w, h) => this.contentHeight = h}
          onLayout={ev => this.scrollViewHeight = ev.nativeEvent.layout.height}
          >
          <View style={{ height }} />
          <View style={{ height: height / 3, borderWidth: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: 8 }}>
            <TouchableOpacity
              onPress={() => {
                if (this.props.lastView === 'Capture') {
                  this.props.navigator.resetTo({ title: 'Menu' });
                } else {
                  this.props.navigator.pop();
                }
              }}
              >
              <Text style={{ color: '#ecf0f1', fontSize: 18, fontWeight: '500', padding: 8, paddingLeft: 0, paddingTop: 0 }}>back</Text>
            </TouchableOpacity>
            <Text style={{ color: '#ecf0f1', fontSize: 18, fontWeight: '500' }}>{name}</Text>
            <Text style={{ color: '#ecf0f1', fontSize: 18, fontWeight: '500' }}>{moment(date).format('LLL')}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  componentDidMount() {
    setTimeout(() => this.scrollToBottom(), 100);
  }

  scrollToBottom = () => {
    console.log('scrolling')
    const scrollHeight = this.contentHeight - this.scrollViewHeight;
    console.log('SCROLLHEIGHT', scrollHeight)

    if (scrollHeight > 0) {
      this.scrollView.scrollTo({ x: 0, y: scrollHeight, animated: true });
    }
  }
}

function mapStateToProps({ selectedPicture }) {
  return { selectedPicture };
}

export default connect(mapStateToProps)(PictureDetail);

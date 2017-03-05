import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from  'react-native';

let { height, width } = Dimensions.get('window');


class PictureDetail extends React.Component {
  render() {
    let { name, date, image } = this.props.selectedPicture;
    return (
      <View style={{ backgroundColor: 'white' }}>
        <Image
          style={{ height, width, position: 'absolute' }}
          source={{ uri: 'https://www.moviepostersusa.com/media/catalog/product/p/1/p104_1.jpg' }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ height }} />
          <View style={{ height: height / 3, borderWidth: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            <TouchableOpacity
              onPress={this.props.navigator.pop}
              >
              <Text style={{ color: '#fff' }}>back</Text>
            </TouchableOpacity>
            <Text style={{ color: '#fff' }}>{name}</Text>
            <Text style={{ color: '#fff' }}>{date}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps({ selectedPicture }) {
  return { selectedPicture };
}

export default connect(mapStateToProps)(PictureDetail);

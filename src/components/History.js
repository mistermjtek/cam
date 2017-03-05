import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  ListView,
  Image,
  AsyncStorage
} from 'react-native';
import { setSelectedPicture } from '../actions';


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class History extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount() {
     AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
        // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = store[i][1];
        });

        var reformattedStore = stores.map(function(value, index, array) {
          let rObj = JSON.parse(value[1]);
          return rObj;
        });
        console.log(reformattedStore);
        this.setState({data: reformattedStore});
      });
    });

  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
        <View style={{ paddingTop: 20, height: 60, backgroundColor: 'gray' }}>
          <TouchableOpacity
            onPress={this.props.navigator.pop}
            >
            <Text>back</Text>
          </TouchableOpacity>
        </View>

        <ListView
          enableEmptySections={true}
          dataSource={ds.cloneWithRows(this.state.data)}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }

  renderRow = data => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigator.push({ title: 'PictureDetail' });
          this.props.setSelectedPicture(data);
        }}
        >
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={{ uri: data.imagePath }}
            style={{ height: 80, width: 80, margin: 10, borderRadius: 2 }}
          />
          <View style={{ marginTop: 10, marginRight: 10 }}>
            <Text style={{ fontWeight: '500', fontSize: 20 }}>{data.name || 'no name'}</Text>
            <Text style={{ fontSize: 16 }}>{data.date || 'no date'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderSeparator = (section, row) => {
    return (
      <View
        key={row}
        style={{ width: '90%', marginLeft: 10, height: 1, backgroundColor: 'black' }}
      />
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setSelectedPicture: data => dispatch(setSelectedPicture(data))
  }
}

export default connect(null, mapDispatchToProps)(History);

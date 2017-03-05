import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  ListView,
  Image,
  AsyncStorage,
  StatusBar
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
        <StatusBar
          animated={true}
          barStyle="light-content"
        />
        <View
          style={{ height: 20, backgroundColor: '#34495e' }}
        />
        <View style={{ height: 40, backgroundColor: '#34495e', alignItems: 'center', flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={this.props.navigator.pop}
              >
              <Text style={{ color: '#ecf0f1', fontSize: 18, fontWeight: '500', padding: 8 }}>back</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 3, alignItems: 'center' }}>
            <Text style={{ color: '#ecf0f1', fontSize: 18, fontWeight: '600', padding: 8 }}>History</Text>
          </View>
          <View style={{ flex: 1 }}>

          </View>
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
            <Text style={{ fontSize: 16 }}>{moment(data.date).format('LLL') || 'no date'}</Text>
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

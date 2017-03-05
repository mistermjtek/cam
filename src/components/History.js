import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  ListView,
  Image
} from 'react-native';
import { setSelectedPicture } from '../actions';

const data = [
  {
    name: 'sfsad',
    date: '423534',
    image: 'asgdaf'
  },
  {
    name: 'dfgdsasdf',
    date: '64534',
    image: 'dsfgd'
  },
  {
    name: 'sadfsag',
    date: '543563',
    image: 'dsfgsdf'
  },
  {
    name: 'dfdsfg',
    date: '34563',
    image: 'sdfgds'
  },
  {
    name: 'dfgdsfg',
    date: '3456434',
    image: 'dsfgsdf'
  },
  {
    name: 'sfsad',
    date: '423534',
    image: 'asgdaf'
  },
  {
    name: 'dfgdsasdf',
    date: '64534',
    image: 'dsfgd'
  },
  {
    name: 'sadfsag',
    date: '543563',
    image: 'dsfgsdf'
  },
  {
    name: 'dfdsfg',
    date: '34563',
    image: 'sdfgds'
  },
  {
    name: 'dfgdsfg',
    date: '3456434',
    image: 'dsfgsdf'
  }
];



const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class History extends React.Component {
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
          dataSource={ds.cloneWithRows(data)}
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
            source={{ uri: '' }}
            style={{ borderWidth: 1, height: 80, width: 80, margin: 10 }}
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

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
  ActivityIndicator,
  TextInput
} from  'react-native';

import ModalPicker from 'react-native-modal-picker';

let { height, width } = Dimensions.get('window');

class PictureDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translation: '',
      selectedCountry: 'ru',
      languageLabel: ''
    }
  }

  componentDidMount() {
    setTimeout(() => this.scrollToBottom(), 100);

    this.fetchTranslate(this.state.selectedCountry);
  }

  fetchTranslate(country) {
    fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=' + country + '&hl=' + country+ '&dt=t&dt=bd&dj=1&source=icon&tk=467103.467103&q=' + this.props.selectedPicture.name)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(new Error(res.statusText))
      }
    }).then(res => {
      return res.json();
    }).then(data => {
      console.log('Request succeeded with JSON response', data);
      this.setState({ translation: data.sentences[0].trans });
    }).catch(err => {
      console.log('Request failed', err);
    });
  }

  onUpdate(option) {
      console.log(option);
      this.setState({selectedCountry: option.value}, () => {
        this.fetchTranslate(this.state.selectedCountry);
        this.setState({languageLabel: option.label});
      });
    }

  render() {

        let index = 0;
        const data = [
            { key: index++, label: 'Russian', value: 'ru' },
            { key: index++, label: 'Chinese', value: 'zh-tw'},
            { key: index++, label: 'Japanese', value: 'ja' },
            { key: index++, label: 'Dutch', value: 'nl' },
        ];

        let label = this.state.languageLabel;

    let { name, date, imagePath } = this.props.selectedPicture;
    let { translation } = this.state;
    // var translation = this.state.translation;

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
          <View style={{ height: height / 3, borderWidth: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: 8 }}>
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
                <ModalPicker
                style={{color: '#FFF'}}
                    data={data}
                    initValue="Select a language!"
                    onChange={(option)=>{ this.onUpdate(option) }}>
                       <TextInput
                        style={{borderWidth:1, borderColor:'#FFF', color: '#FFF', padding:10, height:30}}
                        editable={false}
                        placeholder='Select a language!'
                        placeholderTextColor='#FFF'
                        value={label} />
                </ModalPicker>

            <Text style={{ color: '#ecf0f1', fontSize: 18, fontWeight: '500' }}>{name}</Text>
            <Text style={{ color: '#ecf0f1', fontSize: 18, fontWeight: '500' }}>{moment(date).format('LLL')}</Text>
            <Text style={{ color: '#ecf0f1', fontSize: 18, fontWeight: '500' }}>{translation}</Text>
          </View>
        </ScrollView>
      </View>
    );
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

'use strict';

import React  from 'react-native';
import pinyin from 'pinyin';

import Dimensions from 'Dimensions';

import numToHanzi from './numtohanzi.js';

let {
  Image,
  StyleSheet,
  Text,
  View,
} = React;

var ww = Dimensions.get('window').width;
var wh = Dimensions.get('window').height;


export default class Card extends React.Component {

  constructor(props) {
    super();
    this.state = {
      num  : props.num,
      hanzi: numToHanzi(props.num),
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("Active!", nextProps.num);
  }

  render() {
    return (
      <View style={[styles.card, this.props.style]}>
        <Image style={ styles.bgImage } source={ this.props.bgImage } />
        <View style={ styles.cardInner }>
          <Text style={ styles.cardText }>{ this.state.num }</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 30 }}>{ this.state.hanzi }</Text>
        </View>
      </View>
    );
  }

}

let styles = StyleSheet.create({
  bgImage: {
    opacity: 0.1,
    position: 'absolute',
      top: 0,
      left: 0,
    width: wh
  },
  card: {
    height: wh,
    position: 'absolute',
    width: ww
  },
  cardInner: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 80
  }
});
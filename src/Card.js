'use strict';

import React  from 'react-native';
import pinyin from 'pinyin';

import Dimensions from 'Dimensions';

import numToHanzi from './numtohanzi.js';

let {
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
      cardStyle: props.style,
      num  : props.num,
      hanzi: numToHanzi(props.num)
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("Active!", nextProps.num);
  }

  render() {
    return (
      <View style={[styles.card, this.state.cardStyle]}>
        <View style={ styles.cardInner }>
          <Text style={ styles.cardText }>{ this.state.num }</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 30 }}>{ this.state.hanzi }</Text>
        </View>
      </View>
    );
  }

}

let styles = StyleSheet.create({
  card: {
    height: wh,
    position: 'absolute',
    width: ww
  },
  cardInner: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 80
  }
});
'use strict';

import React  from 'react-native';
import Speech from 'react-native-speech';
import Swiper from 'react-native-swiper';
import pinyin from 'pinyin';

import numToHanzi from './numtohanzi.js';

let {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

class CardView extends React.Component {
  render() {
    return (
      <View style={ styles.card }>
        <Text style={ styles.card_text }>{ this.props.num }</Text>
        <Text style={{ color: '#FFFFFF', fontSize: 30 }}>{ numToHanzi(this.props.num ) }</Text>
      </View>
    );
  }
}

class shumu extends React.Component {
  constructor() {
    super();
    this.state = {
      numCurrent: '',
      numNext: this.getNewNumber()
    }
  }

  getNewNumber() {
    return parseInt(Math.random() * 1000);
  }

  _onMomentumScrollEnd(e, state, context) {
    // you can get `state` and `this`(ref to swiper's context) from params
    this.setState({
      numCurrent: this.state.numNext,
      numNext: this.getNewNumber()
    });
  }

  render() {
    var t = this;

    setTimeout(function() {
      Speech.speak({
        text: ''+t.state.numCurrent,
        voice: 'zh',
        rate: 0.3
      });
    }, 1200);

    let views = [
      <CardView key='1' num={ this.state.numCurrent } />,
      <CardView key='2' num={ this.state.numNext } />
    ];

    return (
      <View style={{ backgroundColor: '#FF0000', position: 'absolute' }}>
        <View style={{ position: 'absolute' }}>
          <Text>Test</Text>
        </View>
        <View style={{ position: 'absolute' }}>
          <Swiper onMomentumScrollEnd={ this._onMomentumScrollEnd.bind(this) }
                  showsPagination={ false }>
            { views }
          </Swiper>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#332255',
  },
  card_text: {
    color: '#FFFFFF',
    fontSize: 80
  }
});

AppRegistry.registerComponent('shumu', () => shumu);

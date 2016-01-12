'use strict';

import React  from 'react-native';
import Speech from 'react-native-speech';
import Swiper from 'react-native-swiper';

let {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

class shumu extends React.Component {
  constructor() {
    super();
    this.state = {
      numCurrent: 0,
      numNext: this.getNewNumber()
    }
  }

  getNewNumber() {
    return parseInt(Math.random() * 100);
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

    Speech.stop();
    setTimeout(function() {
      Speech.speak({
        text: ''+t.state.numCurrent,
        voice: 'zh',
        rate: 0.4
      });
    }, 1200);

    let views = [
      <View key='1' style={ styles.container }><Text style={ styles.text }>{ this.state.numCurrent }</Text></View>,
      <View key='2' style={ styles.container }><Text style={ styles.text }>{ this.state.numNext }</Text></View>,
    ];

    return (
      <Swiper onMomentumScrollEnd={ this._onMomentumScrollEnd.bind(this) }>
        { views }
      </Swiper>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 40
  }
});

AppRegistry.registerComponent('shumu', () => shumu);

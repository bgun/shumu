'use strict';

import React  from 'react-native';
import Speech from 'react-native-speech';
import Swiper from 'react-native-swiper';
import pinyin from 'pinyin';

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
    return parseInt(Math.random() * 1000);
  }

  _onMomentumScrollEnd(e, state, context) {
    // you can get `state` and `this`(ref to swiper's context) from params
    this.setState({
      numCurrent: this.state.numNext,
      numNext: this.getNewNumber()
    });
  }

  pinyinNumbers(input) {
    let p = ['líng','yī','èr','sān','sì','wǔ','lìu','qī','bā','jǐu'];
    return input.split('').map(function(c,index) {
      let n = parseInt(c);
      let tens = '';
      return p[n];
    });
  };

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
      <View key='1' style={ styles.container }>
        <Text style={ styles.text }>{ this.state.numCurrent }</Text>
        <Text>{ this.pinyinNumbers(''+this.state.numCurrent )}</Text>
      </View>,
      <View key='2' style={ styles.container }>
        <Text style={ styles.text }>{ this.state.numNext }</Text>
        <Text>{ this.pinyinNumbers(''+this.state.numNext )}</Text>
      </View>,
    ];

    return (
      <Swiper onMomentumScrollEnd={ this._onMomentumScrollEnd.bind(this) }
              showsPagination={ false }>
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
    backgroundColor: '#332255',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 80
  }
});

AppRegistry.registerComponent('shumu', () => shumu);

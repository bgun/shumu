'use strict';

import React  from 'react-native';
import Speech from 'react-native-speech';
import Swiper from 'react-native-swiper';
import pinyin from 'pinyin';

import Dimensions from 'Dimensions';

import numToHanzi from './numtohanzi.js';

let {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var ww = Dimensions.get('window').width;
var wh = Dimensions.get('window').height;

console.log(wh, ww);

class CardView extends React.Component {
  render() {
    return (
      <View style={[ styles.cardView, this.props.animStyle ]}>
        <View style={ styles.cardViewInner }>
          <Text style={ styles.cardViewText }>{ this.props.num }</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 30 }}>{ numToHanzi(this.props.num ) }</Text>
        </View>
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

  render() {
    var t = this;

    setTimeout(function() {
      Speech.speak({
        text: ''+t.state.numCurrent,
        voice: 'zh',
        rate: 0.3
      });
    }, 1200);

    return (
      <View>
        <View
          style={ styles.mainView }
          onStartShouldSetResponder={ evt => true }
          onResponderGrant={ evt => {
            console.log("start", evt.nativeEvent.pageX);
            this.setState({
              touchStartX: evt.nativeEvent.pageX,
              touchStartY: evt.nativeEvent.pageY
            });
          }}
          onResponderMove={ evt => {
            let dx = this.state.touchStartX - evt.nativeEvent.pageX;
            let dy = this.state.touchStartY - evt.nativeEvent.pageY;
            this.setState({
              moveX: -((dx*dx)/100),
              //moveY: -((dy*dy)/100)
            });
          }}
          onResponderRelease={ evt => {
            console.log("release", evt.nativeEvent.pageX);
          }}
          >
          <View style={ styles.menuView }>
            <Text>Menu</Text>
          </View>
          <View>
            <CardView key='1' num={ this.state.numCurrent } animStyle={{ left: this.state.moveX, top: this.state.moveY }} />
            <CardView key='2' num={ this.state.numNext    } animStyle={{ left: this.state.moveX, top: this.state.moveY }} />
          </View>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#332255',
    flex: 1
  },
  menuView: {
    backgroundColor: '#FF0000',
    height: wh,
    position: 'absolute',
    width: ww
  },
  cardView: {
    backgroundColor: '#00FF00',
    height: wh,
    position: 'absolute',
    width: ww
  },
  cardViewInner: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  cardViewText: {
    color: '#FFFFFF',
    fontSize: 80
  }
});

AppRegistry.registerComponent('shumu', () => shumu);

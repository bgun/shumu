'use strict';

import _          from 'lodash';
import React      from 'react-native';
import Dimensions from 'Dimensions';
import Speech     from 'react-native-speech';

let {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View
} = React;

import Card from './Card';

var ww = Dimensions.get('window').width;
var wh = Dimensions.get('window').height;

const CARD_TYPES = {
  "qian": {
    getNum: () => _.random(1000,9999),
    cardStyle: {
      backgroundColor: 'blue'
    }
  },
  "bai": {
    getNum: () => _.random(100,999),
    cardStyle: {
      backgroundColor: 'purple'
    }
  },
  "shi": {
    getNum: () => _.random(10,99),
    cardStyle: {
      backgroundColor: 'orange'
    }
  },
  "currency": {
    getNum: () => parseFloat(Math.random() * 100).toFixed(2),
    cardStyle: {
      backgroundColor: 'green'
    }
  }
};
const CARD_KEYS = Object.keys(CARD_TYPES);


export default class CardContainer extends React.Component {

  constructor(props) {
    super();
    this.state = {
      dx: 0,
      topCard: this.getNewCardProps(),
      nextCard: this.getNewCardProps()
    };
  }

  getNewCardProps() {
    let r = CARD_KEYS[parseInt(Math.random() * CARD_KEYS.length)];
    let type = CARD_TYPES[r];
    let dt = (new Date()).getTime();
    let bigrand = parseInt(Math.random() * 10000);
    let key = "card:"+dt+":"+bigrand;
    console.log(key);
    return {
      key: key,
      num: type.getNum(),
      style: type.cardStyle
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderRelease  : this.onRelease.bind(this),
      onPanResponderTerminate: this.onRelease.bind(this),
      onPanResponderMove: (e, gestureState) => {
        let dx = gestureState.dx;
        if (dx < 0) {
          dx = 0;
        }
        this.setState({
          dx: dx
        })
      }
    });
  }

  componentDidMount() {
    this.readTopCard();
  }

  readTopCard() {
    setTimeout(() => {
      Speech.speak({
        text: ''+this.state.topCard.num,
        voice: 'zh',
        rate: 0.3
      })
      .catch(e => {
        console.log(e);
      });
    }, 1200);
  }

  onRelease() {
    let animatedX = new Animated.Value(this.state.dx);
    Animated.spring(animatedX, {
      duration: 500,
      toValue: ww+60
    }).start();
    this.setState({
      dx: animatedX
    });
    setTimeout(() => {
      this.setState({
        dx: 0,
        topCard: this.state.nextCard,
        nextCard: this.getNewCardProps()
      });
      this.readTopCard();
    }, 500)
  }

  render() {
    let cards = [
      <View key={this.state.nextCard.key} style={ styles.botCard }>
        <Card { ...this.state.nextCard } />
        <Text>Back</Text>
      </View>,
      <Animated.View key={this.state.topCard.key} style={[styles.topCard, { left: this.state.dx }]}>
        <Card { ...this.state.topCard } />
        <Text>Front</Text>
      </Animated.View>
    ];

    return (
      <View style={ styles.cardView } { ...this._panResponder.panHandlers }>
        { cards }
      </View>
    )
  }

}

let styles = StyleSheet.create({
  cardView: {
    height: wh,
    position: 'absolute',
    width: ww
  },
  topCard: {
    height: wh,
    position: 'absolute',
      top: 0,
      left: 0,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    width: ww
  },
  botCard: {
    height: wh,
    position: 'absolute',
      top: 0,
      left: 0,
    width: ww
  }
});

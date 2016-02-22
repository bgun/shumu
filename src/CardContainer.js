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


export default class CardContainer extends React.Component {

  constructor(props) {
    super();
    console.log("props",props);
    this.state = {
      dx: new Animated.Value(0),
      topCard: this.getNewCardProps(props.cardTypes),
      nextCard: this.getNewCardProps(props.cardTypes)
    };
    this._lastCard = null;
  }

  componentWillReceiveProps(nextProps) {
    console.log("next", nextProps);
  }

  getNewCardProps(types) {
    let cardKeys = Object.keys(types);
    let r;
    if (cardKeys.length < 3) {
      // choose a card type randomly, but don't pick the same type twice in a row
      r = _.sample(cardKeys);
    } else {
      // choose a card type randomly, but don't pick the same type twice in a row
      r = _.sample(_.filter(cardKeys, c => (c !== this._lastCard)));
      this._lastCard = r;
    }
    let type = types[r];
    let dt = (new Date()).getTime();
    let bigrand = parseInt(Math.random() * 10000);
    let key = "card:"+dt+":"+bigrand;
    return {
      key: key,
      num: type.getNum(),
      style: type.cardStyle,
      bgImage: type.backgroundImage
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
        this.state.dx.setValue(dx);
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
    let toValue = 0;
    if (this.state.dx._value > 60) {
      toValue = ww+60;
      setTimeout(() => {
        this.state.dx.setValue(0);
        this.setState({
          topCard: this.state.nextCard,
          nextCard: this.getNewCardProps(this.props.cardTypes)
        });
        this.readTopCard();
      }, 500)
    }
    Animated.spring(this.state.dx, {
      duration: 500,
      toValue: toValue
    }).start();
  }

  render() {
    let cards = [
      <View key={this.state.nextCard.key} style={ styles.botCard }>
        <Card { ...this.state.nextCard } />
      </View>,
      <Animated.View key={this.state.topCard.key} style={[styles.topCard, { left: this.state.dx }]}>
        <Card { ...this.state.topCard } />
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
      top: 0,
    width: ww
  },
  topCard: {
    height: wh,
    position: 'absolute',
      top: 0,
      left: 0,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 40,
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

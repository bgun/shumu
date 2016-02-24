'use strict';

import React  from 'react-native';
import pinyin from 'pinyin';

import Dimensions from 'Dimensions';


let {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

var ww = Dimensions.get('window').width;
var wh = Dimensions.get('window').height;


export default class Card extends React.Component {

  constructor() {
    super();
    this.state = {
      showPinyin: false
    }
  }

  handlePress() {
    this.setState({
      showPinyin: true
    });
  }

  render() {
    return (
      <View style={[styles.card, this.props.style]}>
        <View style={ styles.bgContainer }>
          <Image style={ styles.bgImage } source={ this.props.bgImage } />
        </View>
        <TouchableOpacity onPress={ this.handlePress.bind(this) } style={ styles.cardInner }>
          <Text style={ styles.cardText   }>{ this.props.num }</Text>
          <Text style={ styles.cardHanzi  }>{ this.props.hanzi }</Text>
          { this.state.showPinyin ? (
            <Text style={ styles.cardPinyin }>{ this.props.pinyin.join(' ') }</Text>
          ) : null }
        </TouchableOpacity>
      </View>
    );
  }

}

let styles = StyleSheet.create({
  bgContainer: {
    position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
  },
  bgImage: {
    flex: 1,
    opacity: 0.1,
    width: ww
  },
  card: {
    height: wh,
    position: 'absolute',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 40,
    width: ww
  },
  cardInner: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  cardText: {
    color: '#FFF',
    fontSize: 80
  },
  cardHanzi: {
    color: '#FFF',
    fontSize: 30
  },
  cardPinyin: {
    color: '#FFF',
    fontSize: 24,
    marginTop: 16
  }
});
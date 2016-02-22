'use strict';

import React  from 'react-native';

let {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

import CardContainer from './CardContainer';
import Menu from './Menu';

let window = Dimensions.get('window');


const CARD_TYPES = {
  "thousands": {
    getNum: () => _.random(1000,9999),
    cardStyle: {
      backgroundColor: 'blue'
    },
    backgroundImage: require('../img/tess1.png')
  },
  "hundreds": {
    getNum: () => _.random(100,999),
    cardStyle: {
      backgroundColor: 'purple'
    },
    backgroundImage: require('../img/tess2.png')
  },
  "tens": {
    getNum: () => _.random(10,99),
    cardStyle: {
      backgroundColor: 'orange'
    },
    backgroundImage: require('../img/tess3.png')
  },
  "currency": {
    getNum: () => parseFloat(Math.random() * 100).toFixed(2)+"元",
    cardStyle: {
      backgroundColor: 'green'
    },
    backgroundImage: require('../img/tess4.png')
  }
};


export default class shumu extends React.Component {

  constructor() {
    super();
    this.state = {
      menuOpen: false,
      menuTop: new Animated.Value(0),
      settings: {
        currency: true,
        thousands: true,
        hundreds: true,
        tens: true
      }
    };
  }

  toggleMenu() {
    let open = !this.state.menuOpen;
    let toValue = open ? (window.height * 0.9) : 0;
    Animated.spring(this.state.menuTop, {
      toValue: toValue,
    }).start();
    this.setState({
      menuOpen: open
    });
  }

  updateSettings(settings) {
    this.setState({
      settings: settings
    })
  }

  render() {
    let cardTypes = _.filter(CARD_TYPES, (type, key) => {
      return this.state.settings[key] === true;
    });
    let menuTransform = [                        // `transform` is an ordered array
      { top: this.state.menuTop }
    ];
    return (
      <View style={ styles.mainView }>
        <Menu settings={ this.state.settings } updateSettings={ this.updateSettings.bind(this) } />
        <Animated.View style={[styles.cardView, menuTransform]}>
          <CardContainer cardTypes={ cardTypes } />
        </Animated.View>
        <TouchableOpacity onPress={ this.toggleMenu.bind(this) } style={ styles.menuButton }>
          <Image source={ require('../img/icon_settings.png') } style={ styles.menuButtonImage } />
        </TouchableOpacity>
      </View>
    );
  }

}

let styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#332255',
    flex: 1
  },
  menuButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    height: 48,
    position: 'absolute',
      top: 0,
      left: 0,
    width: window.width
  },
  menuButtonImage: {
    height: 24,
    marginTop: 24,
    width: 24
  },
  cardView: {
    height: window.height,
    position: 'absolute'
  }
});


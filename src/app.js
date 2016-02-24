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
    backgroundImage: require("image!bg_pattern1")
  },
  "hundreds": {
    getNum: () => _.random(100,999),
    cardStyle: {
      backgroundColor: 'purple'
    },
    backgroundImage: require("image!bg_pattern2")
  },
  "tens": {
    getNum: () => _.random(10,99),
    cardStyle: {
      backgroundColor: 'orange'
    },
    backgroundImage: require("image!bg_pattern3")
  },
  "currency": {
    getNum: () => parseFloat(Math.random() * 100).toFixed(2),
    suffix: "元",
    cardStyle: {
      backgroundColor: 'green'
    },
    backgroundImage: require("image!bg_pattern4")
  }
};


export default class shumu extends React.Component {

  constructor() {
    super();
    this.state = {
      menuOpen: false,
      menuTop: new Animated.Value(0),
      menuButtonRotation: new Animated.Value(1),
      overlayFade: new Animated.Value(0),
      settings: {
        currency: true,
        thousands: false,
        hundreds: false,
        tens: false
      }
    };
  }

  toggleMenu() {
    let open = !this.state.menuOpen;

    if (open) {
      Animated.spring(this.state.menuTop, {
        toValue: window.height * 0.9
      }).start();
    } else {
      Animated.timing(this.state.menuTop, {
        toValue: 0
      }).start();
    }

    Animated.spring(this.state.menuButtonRotation, {
      toValue: open ? 180 : 0,
      friction: 5
    }).start();

    Animated.spring(this.state.overlayFade, {
      toValue: open ? 0.7 : 0
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
        <Animated.View style={[styles.absoluteCover, menuTransform]}>
          <CardContainer cardTypes={ cardTypes } />
          { this.state.menuOpen ? (
            <TouchableOpacity onPress={ this.toggleMenu.bind(this) } style={ styles.absoluteCover }>
              <Animated.View style={[styles.overlay, { opacity: this.state.overlayFade }]} />
            </TouchableOpacity>
          ) : null }
        </Animated.View>
        <TouchableOpacity onPress={ this.toggleMenu.bind(this) } style={ styles.menuButton }>
          <Animated.Image
            source={ require('image!icon_settings') }
            style={[
              styles.menuButtonImage,
              { transform: [
                { "rotate": this.state.menuButtonRotation.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg','360deg']
                }) }
              ] }
            ]}
          />
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
    height: 64,
    position: 'absolute',
      top: 0,
      left: 0,
    width: window.width
  },
  menuButtonImage: {
    height: 36,
    marginTop: 24,
    width: 36
  },
  absoluteCover: {
    backgroundColor: 'transparent',
    position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
  },
  overlay: {
    backgroundColor: 'black',
    position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
  }
});


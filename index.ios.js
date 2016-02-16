'use strict';

import React  from 'react-native';

import Dimensions from 'Dimensions';

import CardContainer from './CardContainer';

let {
  Animated,
  AppRegistry,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = React;

var ww = Dimensions.get('window').width;
var wh = Dimensions.get('window').height;

console.log(wh, ww);


class shumu extends React.Component {
  render() {
    return (
      <View style={ styles.mainView }>
        <CardContainer />
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
});

AppRegistry.registerComponent('shumu', () => shumu);

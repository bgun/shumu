'use strict';

import React  from 'react-native';

let {
  StyleSheet,
  Text,
  View,
} = React;

import CardContainer from './CardContainer';
import Menu from './Menu';


export default class shumu extends React.Component {
  render() {
    return (
      <View style={ styles.mainView }>
        <Menu />
      </View>
    );
  }
}
//<CardContainer />

let styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#332255',
    flex: 1
  }
});


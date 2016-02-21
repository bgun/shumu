import React from 'react-native';

import CardContainer from './CardContainer';

let {
  Dimensions,
  StyleSheet,
  Switch,
  Text,
  View,
} = React;

let window = Dimensions.get('window');


let SettingSwitch = (props) => (
  <View style={{ flexDirection: 'row', marginBottom: 16 }}>
    <Switch
      onValueChange={ value => props.handleSwitch(value) }
      value={ props.value }
      />
    <Text style={{ color: 'white', paddingTop: 7, paddingLeft: 12 }}>{ props.label }</Text>
  </View>
);


export default class Menu extends React.Component {

  constructor() {
    super();
    this.state = {
      qian: true,
      thou: true,
      hund: true,
      tens: true
    };
  }

  handleSwitch(a, b) {
    let state = {};
    state[a] = b;
    this.setState(state);
  }

  render() {
    return (
      <View style={ styles.menu }>
        <SettingSwitch label="Show Currency"   value={ this.state.qian } handleSwitch={ this.handleSwitch.bind(this, "qian") } />
        <SettingSwitch label="Show Thousands"  value={ this.state.thou } handleSwitch={ this.handleSwitch.bind(this, "thou") } />
        <SettingSwitch label="Show Hundreds"   value={ this.state.hund } handleSwitch={ this.handleSwitch.bind(this, "hund") } />
        <SettingSwitch label="Show Tens"       value={ this.state.tens } handleSwitch={ this.handleSwitch.bind(this, "tens") } />
      </View>
    )
  }

}

let styles = StyleSheet.create({
  menu: {
    backgroundColor: '#777',
    height: window.height,
    paddingVertical: 80,
    paddingHorizontal: 20,
    position: 'absolute',
      top: 0,
      left: 0,
    width: window.width
  },
});

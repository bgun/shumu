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
    <Text style={{ color: 'white', fontSize: 18, paddingTop: 5, paddingLeft: 12 }}>{ props.label }</Text>
  </View>
);


export default class Menu extends React.Component {

  constructor(props) {
    super();
    this.state = props.settings;
  }

  handleSwitch(key, bool) {
    let state = Object.assign({}, this.state);
    state[key] = bool;
    let atLeastOneTrue = state.tens || state.hundreds || state.thousands || state.currency;
    console.log(atLeastOneTrue, this.state);
    if (atLeastOneTrue) {
      this.setState(state);
      this.props.updateSettings(this.state);
    }
  }

  render() {
    return (
      <View style={ styles.menu }>
        <View>
          <SettingSwitch label="Tens (10-99)"          value={ this.state.tens      } handleSwitch={ this.handleSwitch.bind(this, "tens") } />
          <SettingSwitch label="Hundreds (100-999"     value={ this.state.hundreds  } handleSwitch={ this.handleSwitch.bind(this, "hundreds") } />
          <SettingSwitch label="Thousands (1000-9999)" value={ this.state.thousands } handleSwitch={ this.handleSwitch.bind(this, "thousands") } />
          <SettingSwitch label="Currency"              value={ this.state.currency  } handleSwitch={ this.handleSwitch.bind(this, "currency") } />
        </View>
      </View>
    )
  }

}

let styles = StyleSheet.create({
  menu: {
    backgroundColor: '#338',
    height: window.height,
    paddingVertical: 100,
    paddingHorizontal: 30,
    position: 'absolute',
      top: 0,
      left: 0,
    width: window.width
  },
  menuTitle: {
    color: 'white',
    fontSize: 24,
    marginVertical: 30,
    textAlign: 'center'
  }
});

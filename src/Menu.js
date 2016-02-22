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

  constructor(props) {
    super();
    this.state = props.settings;
  }

  handleSwitch(a, b) {
    let state = {};
    state[a] = b;
    this.setState(state);
    this.props.updateSettings(this.state);
  }

  render() {
    return (
      <View style={ styles.menu }>
        <Text style={{ color: 'white', fontSize: 16, marginBottom: 30, textAlign: 'center' }}>Settings</Text>
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
    backgroundColor: '#138',
    height: window.height,
    paddingVertical: 60,
    paddingHorizontal: 30,
    position: 'absolute',
      top: 0,
      left: 0,
    width: window.width
  },
});

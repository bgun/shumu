import _ from 'lodash';

export default {
  "start": {
    text: "This is the first card.",
    cardStyle: {
      backgroundColor: 'black'
    },
  },
  "thousands": {
    settingText: "Thousands (1000-9999)",
    getNum: () => _.random(1000,9999),
    cardStyle: {
      backgroundColor: 'blue'
    },
    backgroundImage: require("image!bg_pattern1")
  },
  "hundreds": {
    settingText: "Hundreds (100-999)",
    getNum: () => _.random(100,999),
    cardStyle: {
      backgroundColor: 'purple'
    },
    backgroundImage: require("image!bg_pattern2")
  },
  "tens": {
    settingText: "Tens (10-99)",
    getNum: () => _.random(10,99),
    cardStyle: {
      backgroundColor: 'orange'
    },
    backgroundImage: require("image!bg_pattern3")
  },
  "currency": {
    settingText: "Currency (0.01元-99.99元)",
    getNum: () => parseFloat(Math.random() * 100).toFixed(2),
    suffix: "元",
    cardStyle: {
      backgroundColor: 'green'
    },
    backgroundImage: require("image!bg_pattern4")
  }
};

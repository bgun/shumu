'use strict';

var colors = require('colors');

var numToHanzi = require('./src/numtohanzi');

var tests = [
  //[123456, '十二万三千四百五十六'],
  //[120000, '十二万'],
  [99999,  '九万九千九百九十九'],
  [50012,  '五万零一十二'],
  [11011,  '一万一千零一十一'],
  [1050,   '一千零五十'],
  [123,    '一百二十三'],
  [456,    '四百五十六'],
  [16,     '十六'],
  [12,     '十二'],
  [1,      '一'],
  [12.34,  '十二点三四'],
  [321.01, '三百二十一点零一'],
  [88.50,  '八十八点五']
];

tests.forEach(function(test) {
  if (numToHanzi(test[0]) === test[1]) {
    console.log('%d Passed. %s'.green, test[0], test[1]);
  } else {
    console.error('%d Failed. Got %s, expected %s'.red, test[0], numToHanzi(test[0]), test[1]);
  }
});
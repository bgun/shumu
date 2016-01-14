'use strict';

let colors = require('colors');

let tests = [
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
  [1,      '一']
];


function wans(originalNum) {
  console.log("wanning",originalNum);

  let haoma = '零一二三四五六七八九';
  let lingling = haoma[0]+haoma[0];
  let tens = '十百千万';
  let hanzi = '';
  let num = originalNum;

  for (var i = 4; i > 0; i--) {
    let big = Math.pow(10, i);
    if (num > (big - 1)) {
      let digit = Math.floor(num / big);
      hanzi += (haoma[digit] + tens[i-1]);
      num = num % big;
    } else {
      hanzi += haoma[0];
    }
  }

  if (num) {
    hanzi += haoma[num];
  }

  // remove leading, trailing, and repeating zeroes
  while (hanzi.indexOf(lingling) > -1) {
    hanzi = hanzi.replace(lingling, haoma[0]);
  }
  while (hanzi[0] === haoma[0]) {
    hanzi = hanzi.substr(1);
  }
  while (hanzi[hanzi.length-1] === haoma[0]) {
    hanzi = hanzi.substr(0,hanzi.length-1);
  }

  // exception for 11-19
  if (originalNum > 10 && originalNum < 20) {
    hanzi = hanzi.substr(1);
  }

  return hanzi;
}

function numToHanzi(originalNum) {
  let num = originalNum;
  if (num < 100000) {
    return wans(num);
  } else {
    return wans(Math.floor(num / 10000)) + wans(num % 100000);
  }
}

tests.forEach(function(test) {
  if (numToHanzi(test[0]) === test[1]) {
    console.log('%d Passed. %s'.green, test[0], test[1]);
  } else {
    console.error('%d Failed. Got %s, expected %s'.red, test[0], numToHanzi(test[0]), test[1]);
  }
});

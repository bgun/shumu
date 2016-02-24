'use strict';

let haoma = '零一二三四五六七八九';
let lingling = haoma[0]+haoma[0];
let tens = '十百千万';
let liang = '两';

function translateInt(originalNum) {
  let num = originalNum;
  let hanzi = '';

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

  if (originalNum > 199 && hanzi[0] === haoma[2]) {
    hanzi = liang + hanzi.substr(1);
  }

  // exception for 11-19
  if (originalNum > 10 && originalNum < 20) {
    hanzi = hanzi.substr(1);
  }

  return hanzi;
}

function simpleMap(stringNum) {
  return stringNum.split('').map(c => haoma[parseInt(c)]).join('');
}

function numToHanzi(num) {
  // check for a decimal point
  if (!(num % 1 === 0)) {
    let parts = (""+num).split('.');
    return [
      translateInt(parts[0]),
      simpleMap(parts[1])
    ].join('点');
  }

  if (num < 100000) {
    return translateInt(num);
  } else {
    return translateInt(Math.floor(num / 10000)) + wans(num % 100000);
  }
}

module.exports = numToHanzi;

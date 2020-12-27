const fs = require('fs');
const _ = require('lodash');

const text = fs.readFileSync('./input.txt').toString();
const [cardKey, doorKey] = text.split('\n').map(Number)
const cardLoopSize = findLoopSize(cardKey);
const doorLoopSize = findLoopSize(doorKey);
console.log(transform(doorKey, cardLoopSize))

function findLoopSize(key) {
  let subject = 7;
  let value = 1;
  for (let loop = 1; true; loop++) {
    value = (value * subject) % 20201227
    if (value == key) {
      return loop;
    }
  }
}

function transform(subject, loopSize) {
  let value = 1;
  for (let i = 0; i < loopSize; i++) {
    value = (value * subject) % 20201227
  }
  return value;
}
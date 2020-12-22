const fs = require('fs');
const _ = require('lodash');

const text = fs.readFileSync('./input.txt');
const [player1, player2] = text.toString().trim().split('\n\n');
const [h1, ...deck1str] = player1.split('\n')
const [h2, ...deck2str] = player2.split('\n')
const deck1 = deck1str.map(d => +d)
const deck2 = deck2str.map(d => +d)
let i = 0;
while (deck1.length != 0 && deck2.length != 0) {
  const p1 = deck1.shift();
  const p2 = deck2.shift();
  if (p1 >= p2) {
    deck1.push(p1, p2);
  } else {
    deck2.push(p2, p1);
  }
}
const winner = deck1.length != 0 ? deck1 : deck2;
console.log(winner.reduce((acc, val,i) => acc + (val * (winner.length - i)), 0))
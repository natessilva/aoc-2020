const fs = require('fs');
const _ = require('lodash');

const text = fs.readFileSync('./input.txt');
const [player1, player2] = text.toString().trim().split('\n\n');
const [h1, ...deck1str] = player1.split('\n')
const [h2, ...deck2str] = player2.split('\n')
const deck1 = deck1str.map(d => +d)
const deck2 = deck2str.map(d => +d)

const calculateWinner = _.memoize(calculateWinner2, (deck1,deck2)=>`${deck1.join(',')}:${deck2.join(',')}`)
const { deck: winner } = calculateWinner(deck1, deck2);
console.log(winner.reduce((acc, val, i) => acc + (val * (winner.length - i)), 0))
function calculateWinner2(deck1, deck2) {
  const cache = new Set();
  while (deck1.length != 0 && deck2.length != 0) {
    const key = `${deck1.join(',')}:${deck2.join(',')}`
    if (cache.has(key)) {
      return { p: 1, deck: deck1 }
    }
    cache.add(key);
    const p1 = deck1.shift();
    const p2 = deck2.shift();
    if (deck1.length >= p1 && deck2.length >= p2) {
      const { p } = calculateWinner(deck1.slice(0,p1), deck2.slice(0,p2));
      if (p == 1) {
        deck1.push(p1, p2);
      } else {
        deck2.push(p2, p1);
      }
    } else if (p1 >= p2) {
      deck1.push(p1, p2);
    } else {
      deck2.push(p2, p1);
    }

  }
  return deck1.length > 0 ? { p: 1, deck: deck1 } : { p: 2, deck: deck2 };
}
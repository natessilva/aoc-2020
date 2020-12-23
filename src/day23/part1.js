const fs = require('fs');

const text = fs.readFileSync('./input.txt').toString();
const cups = text.split('').map(Number);
let state = { cups, current: 0 };
for (let i = 0; i < 100; i++) {
  state = step(state);
}
let start = state.cups.findIndex(c => c == 1)
let result = [];
for (let i = 0; i < state.cups.length-1; i++) {
  result.push(state.cups[(i + start + 1) % cups.length])
}
console.log(result.join(''))

function step({ cups, current }) {
  const min = Math.min(...cups);
  const max = Math.max(...cups);
  const pickup = [];
  for (let i = 0; i < 3; i++) {
    pickup.push(cups[(current + 1 + i) % cups.length]);
  }
  let destination = cups[current] - 1;
  if (destination < min) {
    destination = max
  }
  while (pickup.includes(destination)) {
    destination--;
    if (destination < min) {
      destination = max;
    }
  }
  let i = current + 4;
  while (true) {
    cups[(i - 3) % cups.length] = cups[i % cups.length];
    if (cups[i % cups.length] == destination) {
      pickup.forEach((p, j) => {
        cups[(i - 2 + j) % cups.length] = p
      })
      break;
    }
    i++;
  }
  return { cups, current: (current + 1) % cups.length }

}
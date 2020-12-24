const fs = require('fs');
const _ = require('lodash');

const text = fs.readFileSync('./input.txt').toString();
const lines = text.split('\n')
const positions = lines.map(line => {
  const pos = { x: 0, y: 0 }
  for (let i = 0; i < line.length; i++) {
    switch (line[i]) {
      case 'e':
        pos.x += 2;
        break;
      case 'w':
        pos.x -= 2;
        break;
      case 's':
        switch (line[i + 1]) {
          case 'e':
            pos.x++;
            pos.y++;
            break;
          case 'w':
            pos.x--;
            pos.y++;
            break;
        }
        i++;
        break;
      case 'n':
        switch (line[i + 1]) {
          case 'e':
            pos.x++;
            pos.y--;
            break;
          case 'w':
            pos.x--;
            pos.y--;
            break;
        }
        i++;
        break;
    }
  }
  return pos;
});
let state = {}
positions.forEach(p => {
  const key = `${p.x}:${p.y}`
  if (state[key] == null || state[key] == 'white') {
    state[key] = 'black';
  } else {
    state[key] = 'white'
  }
})

for(let i = 0;i<100;i++){
    state = step(state);
}

console.log(Object.values(state).filter(s=>s=='black').length)

function step(state) {
  const newState = {};
  _.uniq([].concat(...Object.keys(state).map(tileKey=>{
    const [x, y] = tileKey.split(':')
    return neighbors({ x: +x, y: +y }).map(({ x, y }) => `${x}:${y}`)
  }))).forEach(tileKey => {
    const tile = state[tileKey]
    const [x, y] = tileKey.split(':')
    const n = neighbors({ x: +x, y: +y }).map(({ x, y }) => `${x}:${y}`)
    if (tile == 'white' || tile == null) {
      if (n.filter((n) => state[n] == 'black').length == 2) {
        newState[tileKey] = 'black';
      } else {
        newState[tileKey] = 'white';
      }
    } else {
      if (n.filter((n) => state[n] == 'black').length > 2 || n.filter((n) => state[n] == 'black').length == 0) {
        newState[tileKey] = 'white';
      } else {
        newState[tileKey] = 'black';
      }
    }
  })
  return newState
}

function neighbors({ x, y }) {
  return [
    { x: x - 1, y: y - 1 },
    { x: x + 1, y: y - 1 },
    { x: x - 2, y },
    { x: x + 2, y },
    { x: x - 1, y: y + 1 },
    { x: x + 1, y: y + 1 },
  ]
}
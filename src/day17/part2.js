const fs = require('fs');
const _ = require('lodash');

const text = fs.readFileSync('./day17.txt');
const lines = text.toString().trim().split('\n').filter(x => x);

let living = [].concat(...lines.map((line, y) => line.split('').map((char, x) => char == '#' ? ({ x, y, z: 0, w: 0 }) : null).filter(x => x != null)))
console.log(living)
for (let cycles = 0; cycles < 6; cycles++) {
    living = next(living);
    console.log(living.length)
}

function neighbors({ x, y, z,w }) {
    const n = []
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            for (let k = -1; k <= 1; k++) {
                for (let l = -1; l <= 1; l++) {
                    if (i == 0 && j == 0 && k == 0 && l == 0) {
                        continue;
                    }
                    n.push({ x: x + i, y: y + j, z: z + k, w: w + l })
                }
            }
        }
    }
    return n;
}

function next(living) {
    const result = [];
    const seen = {}
    living.forEach(l => {
        seen[key(l)] = true;
    })
    const cells = _.uniqBy([...living,].concat(...living.map(l => neighbors(l))), key)
    cells.forEach(l => {

        const n = neighbors(l);
        const count = n.map(s => seen[key(s)]).reduce((acc, val) => acc + (val ? 1 : 0), 0)
        if (seen[key(l)] && (count == 2 || count == 3)) {
            result.push(l);
            return
        }
        if (!seen[key(l)] && count == 3) {
            result.push(l)
        }
    })
    return result;
}

function key({ x, y, z,w }) {
    return `${x}:${y}:${z}:${w}`
}
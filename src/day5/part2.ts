import { readFileSync } from 'fs';
import * as _ from 'lodash';

const text = readFileSync('./day5.txt');


const lines = _.sortBy(text.toString().trim().split('\n').map(line => {
    const first = line.substr(0, 7);
    const last = line.substr(7);

    let min = 0;
    let max = 127;

    first.split('').forEach(char => {
        if (char == 'F') {
            max -= Math.round((max - min) / 2);
        } else {
            min += Math.round((max - min) / 2);
        }
    })
    const row = min;
    min = 0;
    max = 7;

    last.split('').forEach(char => {
        if (char == 'L') {
            max -= Math.round((max - min) / 2);
        } else {
            min += Math.round((max - min) / 2);
        }
    })
    return row * 8 + min
}).map(Number), i => i);
const min = lines[0];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line - min != i) {
        console.log(line - 1)
        break;
    }
}
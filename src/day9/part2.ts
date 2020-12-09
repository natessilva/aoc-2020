import { readFileSync } from 'fs';
import * as _ from 'lodash';

const text = readFileSync('./day9.txt');
const seen = new Map<number, boolean>();
const lines = text.toString().trim().split('\n').map(line => {
    return +line
});

const preamble = 25;
let result = 0;
for (let i = preamble; i < lines.length; i++) {
    if (!findMatch(i)) {
        result = lines[i]
        break;
    }
}
for (let i = 0; i < lines.length; i++) {
    let j = i;
    let sum = 0;
    while (sum < result) {

        sum += lines[j];
        j++
    }
    if (sum == result) {

        const min = Math.min(...lines.slice(i, j))
        const max = Math.max(...lines.slice(i, j))
        console.log(min + max);
        break;
    }

}

function findMatch(index: number): boolean {
    for (let i = index - preamble; i < index; i++) {
        for (let j = index - preamble; j < index; j++) {
            if (i == j) {
                continue
            }
            if (lines[i] + lines[j] == lines[index]) {
                return true
            }
        }
    }
    return false;
}


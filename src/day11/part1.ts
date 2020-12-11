import { readFileSync } from 'fs';
import * as _ from 'lodash';

const text = readFileSync('./day11.txt');
const state = text.toString().trim().split('\n').map(line => {
    return line.split('')
})
function next(state: string[][]): string[][] {
    let newState = state.map(line => line.map(char => char));
    state.forEach((line, i) => {
        line.forEach((seat, j) => {
            const neighbors = [
                _.get(state, [i - 1, j - 1], '.'),
                _.get(state, [i - 1, j], '.'),
                _.get(state, [i - 1, j + 1], '.'),
                _.get(state, [i, j - 1], '.'),
                _.get(state, [i, j + 1], '.'),
                _.get(state, [i + 1, j - 1], '.'),
                _.get(state, [i + 1, j], '.'),
                _.get(state, [i + 1, j + 1], '.'),
            ].map(char => char == '#' ? 1 : 0).reduce((acc: number, val) => acc + val, 0)
            if (seat == 'L' && neighbors == 0) {
                newState[i][j] = '#'
                return;
            }
            if (seat == '#' && neighbors >= 4) {
                newState[i][j] = 'L'
            }
        })
    });
    return newState;
}
let prev = state
let nextState = next(state);
while (!_.isEqual(nextState, prev)) {
    prev = nextState;
    nextState = next(prev)
}
// console.log(nextState.reduce((acc, line) => acc + (line.reduce((acc, char) => acc + (char == "#" ? 1 : 0), 0)), 0))
console.log(nextState.map(line => line.join('')).join('').split('').reduce((acc, char) => acc + (char == '#' ? 1 : 0), 0));
import { readFileSync } from 'fs';
import * as _ from 'lodash';

const text = readFileSync('./day11.txt');
const state = text.toString().trim().split('\n').map(line => {
    return line.split('')
})

function getSeat(state: string[][], i: number, j: number, di: number, dj: number) {
    let ci = i + di
    let cj = j + dj;
    let seat = _.get(state, [ci, cj], null);
    while (seat != null && seat == '.') {
        ci = ci + di
        cj = cj + dj;
        seat = _.get(state, [ci, cj], null);
    }
    return seat == null ? '.' : seat;
}
function next(state: string[][]): string[][] {
    let newState = state.map(line => line.map(char => char));
    state.forEach((line, i) => {
        line.forEach((seat, j) => {
            const neighbors = [
                getSeat(state, i, j, - 1, - 1),
                getSeat(state, i, j, - 1, 0),
                getSeat(state, i, j, - 1, 1),
                getSeat(state, i, j, 0, - 1),
                getSeat(state, i, j, 0, 1),
                getSeat(state, i, j, 1, - 1),
                getSeat(state, i, j, 1, 0),
                getSeat(state, i, j, 1, 1),
            ].map(char => char == '#' ? 1 : 0).reduce((acc: number, val) => acc + val, 0)
            if (seat == 'L' && neighbors == 0) {
                newState[i][j] = '#'
                return;
            }
            if (seat == '#' && neighbors >= 5) {
                newState[i][j] = 'L'
            }
        })
    });
    return newState;
}
let prev = state
let nextState = next(state);
// nextState.forEach(line=>console.log(line.join('')))
while (!_.isEqual(nextState, prev)) {
    prev = nextState;
    nextState = next(prev)
}
// console.log(nextState.reduce((acc, line) => acc + (line.reduce((acc, char) => acc + (char == "#" ? 1 : 0), 0)), 0))
console.log(nextState.map(line => line.join('')).join('').split('').reduce((acc, char) => acc + (char == '#' ? 1 : 0), 0));
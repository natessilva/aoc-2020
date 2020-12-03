import { readFileSync } from 'fs';

const text = readFileSync('./day3.txt');

const trees = text.toString().trim().split('\n').map(line => line.trim().split(''));
let count = 0;
const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
]
console.log(slopes.map(([dx, dy]) => {
    let count = 0;
    let x = 0;
    for (let y = 0; y < trees.length; y += dy) {
        if (trees[y][x % trees[y].length] == '#') {
            count++
        }
        x += dx;
    }
    return count
}).reduce((acc, val) => acc *val, 1));
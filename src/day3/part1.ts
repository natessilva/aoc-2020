import { readFileSync } from 'fs';

const text = readFileSync('./day3.txt');

const trees = text.toString().trim().split('\n').map(line => line.trim().split(''));
let count = 0;
let x = 0;
for (let y = 0; y < trees.length; y++) {
        if (trees[y][x % trees[y].length] == '#') {
            count++
        }
        x+=3;
}
console.log(count);
import { readFileSync } from 'fs';

const text = readFileSync('./day2.txt');

const result = text.toString().trim().split('\n').map(line => line.trim().split(':').map(t => t.trim())).map(([rule, value]) => {
    const [val, letter] = rule.split(' ');
    const [min, max] = val.split('-').map(Number)
    return valid(value, min, max, letter);
}).reduce((acc, valid) => acc + (valid ? 1 : 0), 0);
console.log(result)

function valid(value: string, min: number, max: number, letter: string) {
    const chars = value.split('');
    return [min - 1, max - 1].map(index => chars[index] == letter ? 1 : 0).reduce((acc: number, val) => acc + val, 0) == 1
}
import { readFileSync } from 'fs';
import * as _ from 'lodash';

const text = readFileSync('./day14.txt');
const lines = text.toString().trim().split('\n');
let mask = lines[0].split('mask = ')[1].split('');
let one = BigInt('0b' + mask.map((char, index) => char == '1' ? '1' : '0').join(''));
let zero = BigInt('0b' + mask.map((char, index) => char == '0' ? '0' : '1').join(''));

const vals = new Map<BigInt, BigInt>();

console.log(lines.forEach(line => {
    if(line.substr(0,7) == 'mask = '){
        mask = line.split('mask = ')[1].split('');
        one = BigInt('0b' + mask.map((char, index) => char == '1' ? '1' : '0').join(''));
        zero = BigInt('0b' + mask.map((char, index) => char == '0' ? '0' : '1').join(''));
        return
    }
    const [p1, p2] = line.split('] = ')
    const val = BigInt(p2);
    const index = BigInt(p1.split('mem[')[1])
    vals.set(index, val & zero | one);
}));

console.log(Array.from(vals.values()).reduce((acc, val) => BigInt(acc) + BigInt(val), BigInt(0)));
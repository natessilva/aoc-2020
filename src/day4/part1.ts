import { readFileSync } from 'fs';

const text = readFileSync('./day4.txt');

const required = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
]

const lines = text.toString().trim().split('\n\n').map(line => {
    const obj = new Map<string, string>()
    line.split(/\s+/).forEach(prop => {
        const [key, value] = prop.split(':');
        obj.set(key, value)
    });
    return required.reduce((acc, prop) => acc + (obj.has(prop) ? 0 : 1), 0) == 0
}).reduce((acc, val) => acc + (val? 1 : 0), 0);
console.log(lines)
import { readFileSync } from 'fs';
const text = readFileSync('./day13.txt');
const lines = text.toString().trim().split('\n');
const buses = lines[1].split(',')
    .map((char, index) => char == 'x' ? null : { bus: +char, index })
    .filter(b => b != null)
    .map(b => b!)
    .map(({ bus, index }) => ({ remainder: (bus - index % bus) % bus, bus }))
const product = buses.reduce((acc, val) => acc * val.bus, 1)
const result = buses.map(({ remainder, bus }) => {
    const stride = product / bus;
    for (let i = 1; true; i++) {
        let guess = stride * i;
        if (guess % bus == remainder) {
            return guess;
        }

    }
}).reduce((acc, val) => acc + val, 0)
console.log(result % product);
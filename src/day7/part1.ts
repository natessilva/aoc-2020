import { readFileSync } from 'fs';
import * as _ from 'lodash';

const text = readFileSync('./day7.txt');

const map = new Map<string, string[]>()
const lines = text.toString().trim().split('\n').map(line => {
    const [color, rule] = line.split(' bags contain ')
    const rules = rule.split(',').map(t => t.trim())
    console.log(color);
    console.log(rules);
    map.set(color, rules);

});

const contains: {
    [key: string]: true;
} = {}

let foundAny = true;
while (foundAny) {
    foundAny = false;
    map.forEach((val, color) => {
        if (contains[color]) {
            return
        }
        const found = val.find(v => v.includes('shiny gold') || Object.keys(contains).reduce((acc: boolean, c) => acc || v.includes(c), false)) != null
        if (found) {
            foundAny = true;
            contains[color] = true;
        }
    })
}
console.log(Object.keys(contains).length);



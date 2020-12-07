import { readFileSync } from 'fs';
import * as _ from 'lodash';

const text = readFileSync('./day7.txt');

const map = new Map<string, { count: number, color: string }[]>()
const lines = text.toString().trim().split('\n').map(line => {

    const [color, rule] = line.split(' bags contain ');
    const rules = rule.split(',').map(t => t.trim()).filter(rule => rule.match(/(\d+)\s(.+)\sbag/) != null).map(rule => {
        const [first, count, color] = rule.match(/(\d+)\s(.+)\sbag/)!;

        return { count: +count, color }
    })
    map.set(color, rules);

});

function getCount(color: string):number {
    if (!map.has(color) || map.get(color)!.length == 0) {
        return 0;
    }
    return map.get(color)!.map(({ count, color }) => {
        return count + count * getCount(color)
    }).reduce((acc, v) => acc + v, 0);
}

console.log(getCount('shiny gold'))

// const contains: {
//     [key: string]: true;
// } = {}

// let foundAny = true;
// while (foundAny) {
//     foundAny = false;
//     map.forEach((val, color) => {
//         if (contains[color]) {
//             return
//         }
//         const found = val.find(v => v.includes('shiny gold') || Object.keys(contains).reduce((acc: boolean, c) => acc || v.includes(c), false)) != null
//         if (found) {
//             foundAny = true;
//             contains[color] = true;
//         }
//     })
// }
// console.log(Object.keys(contains).length);



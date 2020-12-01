import { readFileSync } from 'fs';

const text = readFileSync('./day1.txt');

const values = text.toString().trim().split('\n').map(Number);

const map = new Map();
values.forEach(v => {
    if (!map.has(v)) {
        map.set(v, true);
    }
})
values.forEach(v1 => values.forEach(v2 => {
    if (!map.has(v1 * v2)){
        map.set(v1*v2, true);
        const target = 2020 - v1-v2;
        if(target!== v1 && target !== v2 && map.has(target)){
            console.log(v1*v2*target);
        }
    }
}))

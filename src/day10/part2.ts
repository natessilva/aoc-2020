import { readFileSync } from 'fs';
import * as _ from 'lodash';

const text = readFileSync('./day10.txt');
const lines = text.toString().trim().split('\n').map(line => {
    return +line
}).sort((a, b) => a < b ? -1 : 1);
// let jolt = 0;
// lines.forEach((adapter,index)=>{
//     console.log('step', adapter - jolt)
//     if(adapter-jolt < 3 && index < lines.length-1 && lines[index+1]-jolt <= 3){
//         console.log('removable'!)
//     }
//     jolt = adapter;
// });

const cache = new Map<string, number>();

function count(jolt: number, index: number): number {
    const key = `${jolt}:${index}`
    if (!cache.has(key)) {
        cache.set(key, (() => {
            if (index >= lines.length) {
                return 1;
            }
            if (lines[index] - jolt < 3 && index < lines.length - 1 && lines[index + 1] - jolt <= 3) {
                return count(lines[index], index + 1) + count(jolt, index + 1);
            }
            return count(lines[index], index + 1)
        })())
    }
    return cache.get(key)!;
}

console.log(count(0, 0))
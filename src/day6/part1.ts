import { readFileSync } from 'fs';
import * as _ from 'lodash';
import { values } from 'lodash';

const text = readFileSync('./day6.txt');


const lines = text.toString().trim().split('\n\n').map(line => {
    const values = _.uniq(([] as string[]).concat(...line.split(/\s+/).map(v => v.split('')))).length;

    return values
}).reduce((acc,val)=>acc+val)
console.log(lines)
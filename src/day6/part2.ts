import { readFileSync } from 'fs';
import * as _ from 'lodash';
import { values } from 'lodash';

const text = readFileSync('./day6.txt');


const lines = text.toString().trim().split('\n\n').map(line => {
    const values = line.split(/\s+/).map(v => v.split(''));
    return values[0].map(letter=>{
        return values.map(row=>row.includes(letter)).reduce((acc,val)=>acc&&val,true) ? 1 : 0
     }).reduce((acc:number,val)=>acc+val,0)
}).reduce((acc:number,val)=>acc+val,0)
console.log(lines)
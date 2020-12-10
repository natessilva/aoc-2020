import { readFileSync } from 'fs';
import * as _ from 'lodash';

const text = readFileSync('./day10.txt');
const lines = text.toString().trim().split('\n').map(line => {
    return +line
}).sort((a,b)=>a<b?-1:1);
let jolt = 0;
let ones = 0;
let threes =1;
lines.forEach(adapter=>{
    if(adapter - jolt > 3){
        console.log('crap')
    }
    if(adapter - jolt == 1){
        ones++
    }
    if(adapter - jolt == 3){
        threes++
    }
    jolt = adapter;
});
console.log(ones*threes)


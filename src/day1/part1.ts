import {readFileSync} from 'fs';

const text = readFileSync('./day1.txt');

const values = text.toString().trim().split('\n').map(Number);
const map = new Map();

values.forEach(v=>{
    if(!map.has(v)){
        map.set(v,true);
        if(map.has(2020-v)){
            console.log(v*(2020-v))
        }
    }
})
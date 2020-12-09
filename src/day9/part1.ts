import { readFileSync } from 'fs';
import * as _ from 'lodash';

const text = readFileSync('./day9.txt');
const seen = new Map<number, boolean>();
const lines = text.toString().trim().split('\n').map(line => {
    return +line
});

const preamble = 25;
for (let i = preamble; i < lines.length; i++) {
    if(!findMatch(i)){
        console.log(lines[i])
        break;
    }
}

function findMatch(index:number): boolean{
    for (let i = index - preamble; i < index; i++) {
        for (let j = index - preamble; j < index; j++) {
            if (i == j) {
                continue
            }
            if(lines[i]+lines[j] == lines[index]){
                return true
            }
        }
    }
    return false;
}


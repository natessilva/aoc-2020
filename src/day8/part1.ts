import { readFileSync } from 'fs';
import * as _ from 'lodash';

const text = readFileSync('./day8.txt');
const seen = new Map<number,boolean>();
const lines = text.toString().trim().split('\n').map(line => {
    const [op,operand] = line.split(' ')
    const val = +operand
    return {
        op,
        val
    }
})
let state = {
    line:0,
    acc:0
}
while(!seen.has(state.line)){
    seen.set(state.line,true);
    const {op,val} = lines[state.line]
    switch(op){
        case 'acc':
            state= {line:state.line+1,acc:state.acc+val}
            break;
        case 'jmp':

            state =  {line:state.line+val,acc:state.acc}
            break;
        case 'nop':
            state = {line:state.line+1,acc:state.acc}
            break;
        default:
    }
}
console.log(state.acc);



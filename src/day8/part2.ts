import { readFileSync } from 'fs';
import * as _ from 'lodash';

const text = readFileSync('./day8.txt');
let seen = new Map<number, boolean>();
const lines = text.toString().trim().split('\n').map(line => {
    const [op, operand] = line.split(' ')
    const val = +operand
    return {
        op,
        val
    }
})
let state = {
    line: 0,
    acc: 0
}

function valid(lines: { op: string, val: number }[]) {

let seen = new Map<number, boolean>();
    state = {
        line: 0,
        acc: 0
    }
    while (!seen.has(state.line) && state.line < lines.length) {

        seen.set(state.line, true);
        const { op, val } = lines[state.line]
        switch (op) {
            case 'acc':
                state = { line: state.line + 1, acc: state.acc + val }
                break;
            case 'jmp':

                state = { line: state.line + val, acc: state.acc }
                break;
            case 'nop':
                state = { line: state.line + 1, acc: state.acc }
                break;
            default:
        }
    }
    return !seen.has(state.line)
}
let l = lines;
const modified = new Map<number, boolean>();
while (!valid(l)){
    let m = false;
    l = lines.map(({op,val}, index) => {
        if(!m && !modified.has(index) && (op == 'jmp' || op == 'nop')){
            console.log('tweaking line', index)
            modified.set(index,true);
            m=true;
            return {op:op == 'jmp' ? 'nop' : 'jmp', val}
        }
        return {op,val}
    });
}
console.log(state.acc)
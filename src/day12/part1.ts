import { readFileSync } from 'fs';
import * as _ from 'lodash';

const text = readFileSync('./day12.txt');
const directions = text.toString().trim().split('\n').map(line => {
    const char = line.substr(0, 1)
    const val = +line.substr(1)
    return {
        char,
        val
    }
})

let state = {
    e: 0,
    n: 0,
    dir: 'E'
}

const result = directions.reduce(({ e, n, dir }, { char, val }) => {
    switch (char) {
        case 'N':
            return {
                e, n:n +val, dir
            }
        case 'S':
            return {
                e, n: n-val, dir
            }
        case 'E':
            return {
                e: e + val, n, dir
            }
        case 'W':
            return {
                e: e - val, n, dir
            }
        case 'L':
            return {
                e, n, dir:turn(dir,'L',val)
            }
        case 'R':
            return {
                e, n, dir:turn(dir,'R',val)
            }
        case 'F':
            switch(dir){
                case 'N':
                    return {
                        e, n: n+val, dir
                    }
                case 'E':
                    return {
                        e: e + val, n, dir
                    }
                case 'S':
                    return {
                        e, n: n-val, dir
                    }
                case 'W':
                    return {
                        e: e - val, n, dir
                    }
            }
    }
    return {e,n,dir}
}, state);

function turn(curr: string, dir: string, val:number) {
    const dirs = ['N', 'E', 'S', 'W'];
    const currI = dirs.findIndex(d => d == curr)!
    const turns = Math.floor(val/90);
    const i = (currI + turns * (dir == 'R' ? 1 : -1) +16)%4;
    console.log(curr,dir,val);
    console.log(i)
    console.log(dirs[i])
    return dirs[i]
}

console.log(Math.abs(result.e) + Math.abs(result.n));
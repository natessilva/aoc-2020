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
    waypoint: {
        e: 10,
        n: 1
    }
}

const result = directions.reduce(({ e, n, waypoint }, { char, val }) => {
    console.log(e,n,waypoint,char,val)
    switch (char) {
        case 'N':
            return {
                e, n, waypoint: { ...waypoint, n: waypoint.n + val }
            }
        case 'S':
            return {
                e, n, waypoint: { ...waypoint, n: waypoint.n - val }
            }
        case 'E':
            return {
                e, n, waypoint: { ...waypoint, e: waypoint.e + val }
            }
        case 'W':
            return {
                e, n, waypoint: { ...waypoint, e: waypoint.e - val }
            }
        case 'L':
            return {
                e, n, waypoint: turn(waypoint, 'L', val)
            }
        case 'R':
            return {
                e, n, waypoint: turn(waypoint, 'R', val)
            }
        case 'F':
            return {
                e: e + waypoint.e * val, n: n + waypoint.n * val, waypoint
            }
    }
    return { e, n, waypoint }
}, state);

function turn(curr:  { e: number, n: number }, dir:string, val: number) {
    let turns = (Math.floor(val/90) * (dir == 'R'? 1 : -1) + 16) % 4;
    let e = curr.e;
    let n = curr.n;
    while(turns > 0){

        const temp = e;
        e = n;
        n = -temp;
        turns--
    }
    return {
        e,n
    }
    
}

console.log(Math.abs(result.e) + Math.abs(result.n));
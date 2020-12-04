import { readFileSync } from 'fs';
import * as _ from 'lodash';

const text = readFileSync('./day4.txt');

const required = {
    'byr': (val: string) => val.length == 4 && +val >= 1920 && +val  <=2002,
    'iyr': (val: string) => val.length == 4 && +val >= 2010 && +val  <=2020,
    'eyr': (val: string) => val.length == 4 && +val >= 2020 && +val  <=2030,
    'hgt': (val: string) => {
        const sub = val.substr(val.length-2)
        if(sub == 'cm'){
            const num = +val.substr(0,val.length-2)
            return num >= 150 && num <= 193;
        }
        if(sub == 'in'){
            const num = +val.substr(0,val.length-2);
            return num >= 59 && num <= 76;
        }
        return false;
    },
    'hcl': (val: string) => /#[0-9a-z]{6}/.test(val),
    'ecl': (val: string) => ['amb', 'blu', 'brn' ,'gry', 'grn', 'hzl', 'oth',].includes(val),
    'pid': (val: string) => val.length == 9 && !isNaN(+val),
}

const lines = text.toString().trim().split('\n\n').map(line => {
    const obj = new Map<string, string>()
    line.split(/\s+/).forEach(prop => {
        const [key, value] = prop.split(':');
        obj.set(key, value)
    });
    let valid = true;
    _.each(required, (fn,key)=>{
        if(!obj.has(key) || !fn(obj.get(key)!)){
            valid = false;
        }
    })
    return valid;
}).reduce((acc, val) => acc + (val ? 1 : 0), 0);
console.log(lines)
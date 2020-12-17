const fs = require('fs');
const _ = require('lodash');
const text = fs.readFileSync('./day16.txt');
const lines = text.toString().trim().split('\n').filter(x => x);
const rules = {}
let state = 'rule'
let invalid = 0;
let lineValidKeys = []
let myTicket = [];
lines.forEach(line => {
    if (line == 'your ticket:') {
        state = 'myticket';
        return;
    }
    if (line == 'nearby tickets:') {
        state = 'other';
        return;
    }
    switch (state) {
        case 'rule':
            const [, key, min1, max1, min2, max2] = /^(.+): (\d+)-(\d+) or (\d+)-(\d+)$/gi.exec(line)
            rules[key] = {
                min1: +min1, max1: +max1, min2: +min2, max2: +max2
            }
            // console.log(key,min1,max1,min2,max2)
            break;
        case 'myticket':
            myTicket = line.split(',').map(x => +x);
            break;
        case 'other':
            line.split(',').map(x => +x).map((value, index) => {
                if (lineValidKeys[index] == null) {
                    lineValidKeys[index] = [];
                }
                let valid = false;
                let validKeys = []
                Object.keys(rules).forEach((key) => {
                    const { min1, max1, min2, max2 } = rules[key];
                    if (value >= min1 && value <= max1 || value >= min2 && value <= max2) {
                        valid = true
                        validKeys.push(key);
                    }
                });
                if (!valid) {
                    invalid += value
                } else {
                    lineValidKeys[index].push(validKeys)
                }
                return valid
            }).reduce((acc, val) => acc && val, true)

            break;
    }
})
const props = lineValidKeys.map(line => {
    return line.reduce((acc, val) => {
        return _.intersection(acc, val)
    }, Object.keys(rules))
});
console.log(props);

let keys = Object.keys(rules).map(key => ({ key, indices: props.map((line, index) => line.find(k => k == key) != null ? index : null).filter(x => x != null) }))
const res = {};
let cnt = true
let departureCount = 0;
while (cnt) {
    cnt = false
    keys.forEach(k => {
        if (departureCount == 6) {
            return;
        }
        if (k.indices.length == 1) {
            console.log('seting value', k, myTicket[k.indices[0]])
            res[k.key] = k.indices[0];
            if (k.key.startsWith('departure')) {
                departureCount++;
            }
            keys.forEach(j => {
                j.indices = j.indices.filter(i => i != res[k.key])
            })
        } else {
            cnt = true;
        }
    })
}
console.log(Object.keys(res).filter(key=>key.startsWith('departure')).map(key=>res[key]).map(index=>myTicket[index]).reduce((acc,val)=>acc*val,1));
const fs = require('fs');

const text = fs.readFileSync('./day16.txt');
const lines = text.toString().trim().split('\n').filter(x => x);
const rules = {}
let state = 'rule'
let invalid = 0;
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
            // console.log(line.split(',').map(x=>+x));
            break;
        case 'other':
            line.split(',').map(x => +x).map(value => {
                let valid = false;
                Object.values(rules).forEach(({ min1, max1, min2, max2 }) => {
                    if (value >= min1 && value <= max1 || value >= min2 && value <= max2) {
                        valid = true
                    }
                });
                if (!valid) {
                    invalid += value
                }
                return valid
            }).reduce((acc, val) => acc && val, true)

            break;
    }
})
console.log(invalid)
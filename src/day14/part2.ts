import { readFileSync } from 'fs';
const text = readFileSync('./day14.txt');
const lines = text.toString().trim().split('\n');
let mask = lines[0].split('mask = ')[1].split('');
let one = BigInt('0b' + mask.map((char, index) => char == '1' ? '1' : '0').join(''));
let zero = BigInt('0b' + mask.map((char, index) => char == '0' ? '0' : '1').join(''));
let x = mask.map((char, index) => char == 'X' ? index : null).filter(x => x != null).map(x => x!);

const vals = new Map<BigInt, BigInt>();

lines.forEach(line => {
    if (line.substr(0, 7) == 'mask = ') {
        mask = line.split('mask = ')[1].split('');
        one = BigInt('0b' + mask.map((char, index) => char == '1' ? '1' : '0').join(''));
        zero = BigInt('0b' + mask.map((char, index) => char == '0' ? '0' : '1').join(''));
        x = mask.map((char, index) => char == 'X' ? index : null).filter(x => x != null).map(x => x!);
        return
    }
    const [p1, p2] = line.split('] = ')
    const val = BigInt(p2);
    const index = BigInt(p1.split('mem[')[1])
    for (let i = 0; i < Math.pow(2, x.length); i++) {
        let temp = index|one;
        x.forEach((x,j)=>{
            if((i & Math.pow(2, j)) > 0){
                temp |= BigInt(Math.pow(2,35-x))
            } else {
                let ones = '111111111111111111111111111111111111'.split('')
                ones[x] = '0';
                temp &= BigInt('0b' + ones.join(''))
            }
        });
        vals.set(temp, val)
    }
})

console.log(Array.from(vals.values()).reduce((acc, val) => BigInt(acc) + BigInt(val), BigInt(0)));
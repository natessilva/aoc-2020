const fs = require('fs');

const text = fs.readFileSync('./day15.txt');
const lines = text.toString().trim().split('\n');
const moves = lines[0].split(',').map(char => +char);

const ctx = {
    cache: new Map(),
    index: 0,
    last: 0,
}


moves.forEach(move)
while (ctx.index != 30000000-1) {
    const last = ctx.cache.get(ctx.last);

    if (last.index == null) {
        move(0, ctx.index + 1)
    } else  {
        move(last.last - last.index, ctx.index+1)
    }
}
console.log(ctx.last);

function move(move, index) {
    if (!ctx.cache.has(move)) {
        ctx.cache.set(move, {
            last:null
        });
    }
    const m = ctx.cache.get(move);
    m.index = m.last;
    m.last = index;
    ctx.index = index;
    ctx.last = move;
}
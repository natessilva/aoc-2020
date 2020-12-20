const fs = require('fs');

const text = fs.readFileSync('./day19.txt');
const lines = text.toString().trim().split('\n');
const rules = {}
let i = 0
for (; i < lines.length; i++) {
  const line = lines[i]
  if (line == '') {
    break;
  }
  const [, id, rule] = /^(\d+): (.*)$/.exec(line)
  rules[id] = rule
}

console.log(lines.slice(i + 1).map(line=>{
  const { matches: m, size } = matches(0, line, 0);
  return m&&size==line.length
}).reduce((acc,val)=>acc+(val?1:0),0));

function matches(ruleIndex, line, lineIndex) {
  const rule = rules[ruleIndex];
  if (rule.startsWith('"')) {
    const [, val] = /^"(.*)"$/.exec(rule)
    return { matches: line[lineIndex] == val, size: lineIndex + 1 }
  }
  const subRules = rule.split(' | ')
  const res = subRules.map((rule) => {
    return rule.split(' ').reduce((acc, r, i) => {
      const res = matches(r, line, acc.size);
      return { matches: acc.matches && res.matches, size: res.size }
    }, { matches: true, size: lineIndex })
  });
  const found = res.find(r => r.matches)
  if (found) {
    return found;
  }
  return res[0]
}
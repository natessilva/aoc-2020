const fs = require('fs');
const _ = require('lodash');

const text = fs.readFileSync('./day19.txt');
const lines = text.toString().trim().split('\n').map(line => {
  // if (line == '8: 42') {
  //   return '8: 42 | 42 8'
  // }
  // if (line == '11: 42 31') {
  //   return '11: 42 31 | 42 11 31'
  // }
  return line
});
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

const maxLength = Math.max(...lines.slice(i + 1).map(line=>line.length));
const possibilities = _.memoize(possibilities2, (ruleKey)=>`${ruleKey}`)
function possibilities2(ruleKey) {
  const rule = rules[ruleKey]
  if (rule.startsWith('"')) {
    const [, val] = /^"(.*)"$/.exec(rule)
    return [val]
  }
  // if(ruleKey == '8'){
  //   possibilities(42).red
  // }
  const sequences = rule.split(' | ');
  return [].concat(...sequences.map(s=>{
    const [head,...tail] = s.split(' ').map(key=>possibilities(key));
    const result = tail.reduce((a,b)=>{
      const res = []
      a.forEach(a=>{
        b.forEach(b=>{
          res.push(a+b)
        })
      })
      return res;
    },head);
    return result

  }))
}

const forty2 = possibilities(42);
const thirty1 = possibilities(31);

console.log(lines.slice(i + 1).map(line=>{
  let state = 'init';
  let f = 0;
  let t = 0;
  for(let i=0;i<line.length;i+=8){
    const sub = line.substr(i,8)
    if(!forty2.includes(sub) && !thirty1.includes(sub)){
      return false;
    }
    if(state == 'init'){
      if(!forty2.includes(sub)){
        return false;
      }
      f++;
      state = '8'
    }else if (state == '8'){
      if(!forty2.includes(sub)){
        return false;
      }
      f++
      state = '42'
      
    } else if(state == '42') {
      if(thirty1.includes(sub)){
        state = '31';
        t++
      } else {
        f++
      }
    } else {
      if(!thirty1.includes(sub)){
        return false;
      } else {
        t++
      }
    }
  }

  return state == '31' && t<f
}).reduce((acc,val)=>acc+(val?1:0),0))

// const matches = _.memoize(matches2, (ruleIndex, line, lineIndex) => `${ruleIndex}:${line}:${lineIndex}`)
// console.log(.map(line => p.includes(line)).reduce((acc,val)=>acc+(val?1:0),0))



// function possibilities(ruleIndex, line, lineIndex) {
//   const rule = rules[ruleIndex];
//   if (rule.startsWith('"')) {
//     const [, val] = /^"(.*)"$/.exec(rule)
//     return { matches: line[lineIndex] == val, size: lineIndex + 1 }
//   }
//   const subRules = rule.split(' | ')
//   const res = subRules.map((rule) => {
//     return rule.split(' ').reduce((acc, r, i) => {
//       const res = matches(r, line, acc.size);
//       return { matches: acc.matches && res.matches, size: res.size }
//     }, { matches: true, size: lineIndex })
//   });
//   const found = res.find(r => r.matches)
//   if (found) {
//     return found;
//   }
//   return res[0]
// }
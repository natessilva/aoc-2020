const fs = require('fs');
const _ = require('lodash');

const text = fs.readFileSync('./day20.txt');
const lines = text.toString().trim().split('\n\n');

const pieces = {};
lines.forEach(line => {
  const [title, ...lines] = line.split('\n')
  const [_, value] = /Tile (\d+):/.exec(title);
  pieces[value] = lines.map(l => l.split(''))
})

const allEdges = {}

Object.keys(pieces).forEach(key=>{
  const piece = pieces[key];
  const perms = permutations(piece);
  const edges = perms.map(p=>p[0].join(''))
  edges.forEach(e=>{
    if(allEdges[e] == null){
      allEdges[e] = []
    }
    allEdges[e].push(key)
  })
})

const pieceCounts = {}

Object.keys(allEdges).forEach(edge=>{
  if(allEdges[edge].length > 1){
    allEdges[edge].forEach(p=>{
      pieceCounts[p] = pieceCounts[p] == null ? 1 : pieceCounts[p]+1
    })
  }
})

console.log(Object.keys(pieceCounts).filter(p=>pieceCounts[p] == 4).reduce((acc,val)=>acc*val,1))

function rotate(piece) {
  return piece.map(((line, i) => line.map((char, j) => piece[piece.length - 1 - j][i])))
}

function flip(piece) {
  return piece.map(((line, i) => line.map((char, j) => piece[i][line.length - 1 - j])))
}

function permutations(piece) {
  return [
    piece,
    rotate(piece),
    rotate(rotate(piece)),
    rotate(rotate(rotate(piece))),
    flip(piece),
    flip(rotate(piece)),
    flip(rotate(rotate(piece))),
    flip(rotate(rotate(rotate(piece)))),
  ]
}
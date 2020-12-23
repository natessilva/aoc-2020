const fs = require('fs');

const text = fs.readFileSync('./input.txt').toString();
const cups = text.split('').map(Number);

const list = {
  head:null,
  tail:null
}
const nodes = {};
cups.forEach(cup=>{
  if(list.head==null){
    list.head = {cup}
    list.head.next = list.head;
    nodes[cup] = list.head;
    list.tail = list.head;
    return;
  }
  const node = {
    cup,
    next:list.head,
  };
  nodes[cup] = node;
  list.tail.next = node;
  list.tail = node;
})
let max = Math.max(...cups)+1;
for(let i = cups.length;i<1000000;i++){
  const cup = max;
  max++
  const node = {
    cup,
    next:list.head,
  };
  nodes[cup] = node;
  list.tail.next = node;
  list.tail = node;
}

let curr = list.head;
for(let i =0;i<10000000;i++){
  curr = step(curr);
}
printLinst()

function step(current){
  const pickup = current.next;
  const afterPickup = pickup.next.next.next;
  current.next = afterPickup;

  let destination = current.cup-1;
  if(destination==0){
    destination = max-1;
  }
  while(pickup.cup == destination || pickup.next.cup == destination || pickup.next.next.cup == destination){
    destination--;
    if(destination==0){
      destination=max-1;
    }
  }
  const d = nodes[destination]
  pickup.next.next.next = d.next;
  d.next = pickup;
  return current.next
}


function printLinst(){
  console.log(nodes[1].next.cup * nodes[1].next.next.cup);
}
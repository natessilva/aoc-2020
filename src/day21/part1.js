const fs = require('fs');
const _ = require('lodash');

const text = fs.readFileSync('./input.txt');
const lines = text.toString().trim().split('\n');
const allergens = {};
const allIngredients = {};
lines.forEach(line=>{
  const [,part1,part2] = /^(.+) \(contains (.+)\)$/.exec(line)
  const ingredients = part1.split(' ');
  ingredients.forEach(i=>{
    allIngredients[i] = allIngredients[i] == null ? 1 : allIngredients[i]+1
  })
  const al = part2.split(', ')
  al.forEach(a=>{
    if(allergens[a] == null){
      allergens[a] = []
    }
    allergens[a].push(ingredients)
  })
  // console.log(part1.split(' '),part2.split(', '))
})

let allergenIngredients = Object.keys(allergens).map(allergen=>{
  const [head,...tail] = allergens[allergen]
  return {allergen, ingredients:tail.reduce((acc,val)=>{
    return _.intersection(acc,val)
  },head)}
})

let singles = allergenIngredients.filter(a=>a.ingredients.length == 1);
let result = {};
let ingredientAllergens = {};
while(singles.length>0){
    singles.forEach(({allergen, ingredients})=>{
    const [ingredient] = ingredients.filter(i=>ingredientAllergens[i] == null)
    result[allergen] = ingredient;
    ingredientAllergens[ingredient] = allergen;
  });
  singles = allergenIngredients.filter(a=>a.ingredients.filter(i=>ingredientAllergens[i]==null).length == 1)
}


console.log(Object.keys(allIngredients).filter(i=>ingredientAllergens[i] == null).map(i=>allIngredients[i]).reduce((acc,val)=>acc+val,0))

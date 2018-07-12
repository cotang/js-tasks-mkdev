// Shallow merge

let shallow11 = { name: 'fred', age: 10 }
let shallow12 = { age: 40 }

let shallow21 = { name: 'fred', age: 10, contact: { email: 'moo@example.com' }}
let shallow22 = { age: 40, contact: { email: 'baa@example.com' }}

let shallow31 = { name: 'fred', age: 10, contact: { email: 'moo@example.com', tel: { mobile: 112} }}
let shallow32 = { age: 40, contact: { email: 'baa@example.com', tel: { mobile: 911} }}
let shallow33 = { name: 'matthew', surname: 'perry', contact: { tel: { home: 123} }}


function immutableShallowMerge(...arguments){
  let clone = {};
  for (let argument of arguments) {
    for (let key in argument) {
      clone[key] = argument[key];
    }
  }  
  return clone;
}

let shallow1X = immutableShallowMerge(shallow11, shallow12)
let shallow2X = immutableShallowMerge(shallow21, shallow22)
let shallow3X = immutableShallowMerge(shallow31, shallow32, shallow33)
console.log(shallow1X, shallow11)
console.log(shallow2X, shallow21)
console.log(shallow3X, shallow31)





// Deep merge

let deep1 = {name: 'Fred', location: {city: 'Berlin'}, contact: {email: 'moo@example.com'}}
let deep2 = {age: 40, relatives: {wife: 'Anna'}, contact: {phone: '0505573558'}}
let deep3 = {age: 70, location: {city: 'Amsterdam', country: 'Netherlands'}, contact: {postcode: 123456}}

function immutableDeepMerge(...arguments){
  let clone = {};
  for (let arg of arguments){   
    for (let key in arg) {
      if (typeof arg[key] == 'object' && !Array.isArray(arg[key])) {
        if ( Object.keys(clone).indexOf(key) == -1 ){
          Object.assign(clone, {[key] : arg[key]});          
        } else {
          clone[key] = immutableDeepMerge(clone[key], arg[key])
        }
      } else {
        Object.assign(clone, {[key] : arg[key]});
      }
    }
  }  
  return clone;
}

let deepX = immutableDeepMerge(deep1, deep2, deep3)
console.log(deepX, deep1)
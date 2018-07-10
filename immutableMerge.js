var o11 = { name: 'fred', age: 10 };
var o12 = { age: 40 }

var o21 = { name: 'fred', age: 10, contact: { email: 'moo@example.com' }};
var o22 = { age: 40, contact: { email: 'baa@example.com' }}

var o31 = { name: 'fred', age: 10, contact: { email: 'moo@example.com', tel: { mobile: 112} }};
var o32 = { age: 40, contact: { email: 'baa@example.com', tel: { mobile: 911} }}
var o33 = { name: 'matthew', surname: 'perry', contact: { tel: { mobile: 000} }}


function immutableMerge(...arguments){
  var clone = {};
  for (let argument of arguments)
    for (let key in argument) {
      clone[key] = argument[key];
    }
  }  
  return clone;
}


immutableMerge(o11, o12);
immutableMerge(o21, o22);
immutableMerge(o31, o32, o33);
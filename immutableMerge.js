var o11 = { name: 'fred', age: 10 };
var o12 = { age: 40 }

var o21 = { name: 'fred', age: 10, contact: { email: 'moo@example.com' }};
var o22 = { age: 40, contact: { email: 'baa@example.com' }}

var o31 = { name: 'fred', age: 10, contact: { email: 'moo@example.com', tel: { foo: 'bar'} }};
var o32 = { age: 40, contact: { email: 'baa@example.com', tel: { foo: 'baz'} }}


function immutableMerge(obj1, obj2){
  var clone = {};
  for (var i=0;i<arguments.length;i++){
    for (var key in arguments[i]) {
      clone[key] = arguments[i][key];
    }
  }  
  return clone;
}



immutableMerge(o11, o12);
immutableMerge(o21, o22);
immutableMerge(o31, o32);
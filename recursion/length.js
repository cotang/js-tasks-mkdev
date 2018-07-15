// Array.prototype.Rlength = function(){
//   return this;
// };
Array.prototype.Rlength = this;

var res = [5,6,2,7].Rlength;
console.log('result', res);
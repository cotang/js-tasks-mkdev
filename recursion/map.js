Array.prototype.Rmap = function (fn) {  
  if (this.length == 1) {
    // console.log('end', this);
    return fn(this);
  } else {
    var firstEl = fn(this.shift());
    // console.log('stack', firstEl, this, this[0], fn(this[0]));
    return [firstEl].concat(this.Rmap(fn))
  }
};

var newArr = [4,5,6,7].Rmap(function(element, index, arr) {
  return element*10;
});

console.log('result', newArr);



// Array.prototype.map = function (fn) {
//   var map = [];
//   for(let i = 0; i < this.length; i++) {
//     map.push(fn(this[i], i, this));   
//   }
//   return map;
// };



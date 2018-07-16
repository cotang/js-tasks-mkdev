Array.prototype.Rmap = function (fn) {
	let arr = this.slice();
  if (arr.length == 1) {
    // console.log('end', arr);
    return fn(arr);
  } else {
    var firstEl = fn(arr.shift());
    // console.log('stack', firstEl, arr, arr[0], fn(arr[0]));
    return [firstEl].concat(arr.Rmap(fn))
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



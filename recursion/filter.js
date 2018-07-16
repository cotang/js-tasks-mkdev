Array.prototype.Rfilter = function (fn) {
  let arr = this.slice();
  // console.log(fn(arr[0]), fn(arr[arr.length-1]))
  if (arr.length == 1) {
    // console.log('end', arr);
    if(fn(arr)) return arr;
  } else {
    var firstEl = arr.shift();
    var isFiltered = fn(firstEl);
    // console.log('stack', firstEl, arr, arr[0], fn(arr[0]));
    if (isFiltered){    
      return [firstEl].concat(arr.Rfilter(fn))
    } else {
      return [].concat(arr.Rfilter(fn))
    }
  }
};


var newArr = [5,6,2,7].Rfilter(function(element, index, arr) {
  return element > 5;
});

console.log('result', newArr);



// Array.prototype.filter = function (fn) {
//   var filtered = [];
//   for(let i = 0; i < this.length; i++) {
//     console.log( fn(this[i], i, this) );
//     if (fn(this[i], i, this)) {
//       filtered.push(this[i]);
//     }    
//   }
//   return filtered;
// };
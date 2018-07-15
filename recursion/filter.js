Array.prototype.Rfilter = function (fn) { 
  // console.log(fn(this[0]), fn(this[this.length-1]))
  if (this.length == 1) {
    // console.log('end', this);
    if(fn(this)) return this;
  } else {
    var firstEl = this.shift();
    var isFiltered = fn(firstEl);
    // console.log('stack', firstEl, this, this[0], fn(this[0]));
    if (isFiltered){    
      return [firstEl].concat(this.Rfilter(fn))
    } else {
      return [].concat(this.Rfilter(fn))
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
Array.prototype.Rreduce = function (fn, init) {
  let arr = this.slice();  
  let res = (init != 'undefined') ? init : arr[0];
  if (arr.length == 1) {
    // console.log('end', arr, res, fn(res, arr[0]));
    return fn(res, arr[0]);
  } else {
    // console.log('stack', arr, res, arr[0], fn(res, arr[0]));
    if (init != undefined){
      res = fn(res, arr[0])
      arr.shift(); 
    } else {
      res = fn(res, arr[1])
      arr.splice(0,2);
    }     
    return arr.Rreduce(fn, res);
  }
};


var arr = [1, 2, 3, 4, 5]
var result1 = arr.Rreduce(function(sum, current, index, arr) {
  return sum + current;
}, 0);
console.log('result1', result1);

var result2 = arr.Rreduce(function(sum, current, index, arr) {
  return sum * current;
}, 10);
console.log('result2', result2);

var result3 = arr.Rreduce(function(sum, current, index, arr) {
  return sum - current;
});
console.log('result3', result3);




// Array.prototype.reduce = function (fn, init) {
//   var res = init;
//   for(let i = 0; i < this.length; i++) {
//     // console.log(this[i], this, fn( init, this[i], i, this), fn )
//     res = fn(res, this[i], i, this) 
//   }
//   return res;
// };


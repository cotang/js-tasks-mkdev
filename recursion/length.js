Array.prototype.Rlength = function() {
  let arr = this.slice();
  let l = 0
  if (arr[0] == undefined) {
    return l
  } else {
    l++;
    arr.shift();
    return l+arr.Rlength()
  }  
};


console.log('result', [10,20,30,10,500].Rlength())
console.log('result', [10].Rlength())
console.log('result', [].Rlength())


// Array.prototype.Rlength = function () {
//   var l = 0;
//   for(let i = 0; i < this.length; i++) {
//     l++
//   }
//   return l;
// };
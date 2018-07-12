var Hamming = function () {};

Hamming.prototype.compute = function (str1, str2) {
  var arr1 = str1.split('');
  var arr2 = str2.split('');
  if (arr1.length == arr2.length){
    return result = arr1.reduce(function(sum, current, i) {
      if (current == arr2[i]){
        return sum;
      } else {
        return sum + 1;
      }
    }, 0);
  } else {
    throw new Error('DNA strands must be of equal length.');
  }
};

module.exports = Hamming;
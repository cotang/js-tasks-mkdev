var Luhn = function (str) {
  var arr = str.split('').filter(r => r.replace(" ",""));

  var result = arr.reduce(function(sum, el, i) {    
    if (i%2 != 0){
      if (el*2 > 9){
        return sum + el*2-9
      } else {
        return sum + el*2
      }    
    } else {
      return sum + +el 
    }    
  }, 0);

  if (result%10 == 0 && result){
    this.valid =  true
  } else {
    this.valid = false
  }

};


module.exports = Luhn;
function encrypt(str, shift){
  if (shift > 26 || shift < -26){
    shift = shift%26
  }
  return str.split('').map(function(letter){    
    var pos = letter.charCodeAt();
    if ( (pos >=65 && pos <=90) || (pos >=97 && pos <=122) ){
      var newPos = pos + shift;
      if (( letter == letter.toUpperCase() && newPos>90 ) || (letter == letter.toLowerCase() && newPos>122 )){
        newPos = newPos - 26;
      } else if (( letter == letter.toUpperCase() && newPos<65 ) || (letter == letter.toLowerCase() && newPos<97 )){
        newPos = newPos + 26;
      }
      var newLetter = String.fromCharCode(newPos);
      return newLetter;
    } else {
      return letter;
    }
  }).join('');
}
function decrypt(str, shift){
  return encrypt(str, -shift)
}

// console.log(encrypt('Aabc xyzZ', 1), 'Bbcd yzaA')
// console.log(decrypt('Bbcd,yzaA', 1), 'Aabc,xyzZ')
// console.log(encrypt('Aabc%xyzZ', 27), 'Bbcd%yzaA')
// console.log(decrypt('B bcdyza A', 27), 'A abcxyz Z')
// console.log(encrypt('Aabc-xyzZ', -27), 'Zzab-wxyY')
// console.log(decrypt('Zzab000wxyY', -27), 'Aabc000xyzZ')
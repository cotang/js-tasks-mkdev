function pickRandomLetter(str) {
  var rand = Math.random() * str.length;
  rand = Math.floor(rand);
  return str[rand];
}

function uid(alphabet, n) {
  return Array(n).fill(null).map(() => pickRandomLetter(alphabet)).join('')
}


// uid("abc", 0) 
// uid("abc", 1) 
// uid("abc", 2)
// uid("abc", 3)
// uid("abcde", 27)

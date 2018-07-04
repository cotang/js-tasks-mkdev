function uid(alphabet, n) {
  var uid = '';
  for (var i=0;i<n;i++){
    var rand = Math.random() * alphabet.length;
    rand = Math.floor(rand);
    uid += alphabet[rand]
  }
  return uid
}

// uid("ab", 1) // One of: "a", "b"
// uid("ab", 2) // One of: "aa", "ab", "ba", "bb"
// uid("ab", 3) // One of: "aaa", "aab", "aba" ...

// uid("abc", 1) // One of: "a", "b", "c"
// uid("abc", 2) // One of: "aa", "ab", "ac", "ba", "bb", "bc", "ca", "cb", "cc"
// uid("abc", 3) // One of: "aaa", "aab", "aac" ...
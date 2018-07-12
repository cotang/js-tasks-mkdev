var DnaTranscriber = function () {};

DnaTranscriber.prototype.toRna = function (string) {
  var arr = string.split('');
  arr = arr.map(l => {
    switch (l) {
      case 'C':
        return 'G';
      case 'G':
        return 'C';
      case 'T':
        return 'A';
      case 'A':
        return 'U';
    }
  });
  if (arr.indexOf(undefined) == -1) {
    return arr.join('')
  } else {
    throw new Error('Invalid input');
  }
};

module.exports = DnaTranscriber;


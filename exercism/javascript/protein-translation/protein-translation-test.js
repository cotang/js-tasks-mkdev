var translate = function (string) {
  var arr = (string) ? string.match(/.{3}/g) : [];
  arr = arr.map(codon => { 
    switch (codon) {
      case 'AUG':
        return 'Methionine';
      case 'UUU':
        return 'Phenylalanine';
      case 'UUC':
        return 'Phenylalanine';
      case 'UUA':
        return 'Leucine';
      case 'UUG':
        return 'Leucine';
      case 'UCU':
        return 'Serine';
      case 'UCC':
        return 'Serine';
      case 'UCA':
        return 'Serine';
      case 'UCG':
        return 'Serine';
      case 'UAU':
        return 'Tyrosine';
      case 'UAC':
        return 'Tyrosine';
      case 'UGU':
        return 'Cysteine';
      case 'UGC':
        return 'Cysteine';
      case 'UGG':
        return 'Tryptophan';
      case 'UAA':
        break;
      case 'UAG':
        break;
      case 'UGA':
        break;
      default:
        throw new Error('Invalid codon');
    }
  });
  return arr;
};

module.exports = translate;
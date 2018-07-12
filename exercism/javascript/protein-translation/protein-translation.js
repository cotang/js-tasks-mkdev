var codons = {
  'AUG' : 'Methionine',
  'UUU' : 'Phenylalanine',
  'UUC' : 'Phenylalanine',
  'UUA' : 'Leucine',
  'UUG' : 'Leucine',
  'UCU' : 'Serine',
  'UCC' : 'Serine',
  'UCA' : 'Serine',
  'UCG' : 'Serine',
  'UAU' : 'Tyrosine',
  'UAC' : 'Tyrosine',
  'UGU' : 'Cysteine',
  'UGC' : 'Cysteine',
  'UGG' : 'Tryptophan',
  'UAA' : 'STOP',
  'UAG' : 'STOP',
  'UGA' : 'STOP'
}

var translate = function (string) {
  var triplets = string ? string.match(/.{3}/g) : [];
  var newArr = [];

  for (let triplet of triplets) {
    if (codons[triplet] == 'STOP'){
      break;
    } else if (codons[triplet] == null) {
      throw new Error('Invalid codon');
    } else {
      newArr.push(codons[triplet]);      
    }
  }

  return newArr;
};

module.exports = translate;


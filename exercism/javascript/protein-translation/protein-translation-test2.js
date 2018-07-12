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
  'UAA' : null,
  'UAG' : null,
  'UGA' : null
}

var translate = function (string) {
  var triplets = string ? string.match(/.{3}/g) : [];
  var newArr = [];

  triplets: for (let triplet of triplets) {
    for (let codon in codons) {
      if (triplet == codon){
        if (codons[codon] == null){
          break triplets;
        } else {
          newArr.push(codons[codon]);
        }        
      }
    }
    if (Object.keys(codons).indexOf(triplet) == -1){
      throw new Error('Invalid codon');
    }
  }

  return newArr;
};

module.exports = translate;
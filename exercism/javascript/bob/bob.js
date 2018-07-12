var Bob = function () {};

Bob.prototype.hey = function (phrase) {
  phrase = phrase.trim();
  if ( phrase.match(/\?$/) && phrase.match(/[A-Z]/g) && !phrase.match(/[a-z]/g) ){
    return "Calm down, I know what I'm doing!"
  } else if ( phrase.match(/\?$/) ){
    return 'Sure.'
  } else if (phrase.match(/[A-Z]/g) && !phrase.match(/[a-z]/g)){
    return 'Whoa, chill out!'
  } else if (!phrase) {
    return 'Fine. Be that way!'
  } else {
    return 'Whatever.'
  }
};

module.exports = Bob;


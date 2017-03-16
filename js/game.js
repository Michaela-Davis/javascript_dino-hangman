var testWord = 'letter';

function Game(word) {
  this.guessesRemaining = 10;
  this.guessedLetters = [];
  this.currentWord = word.toLowerCase();

  var wordArray = [];
  for (var i = 0; i < this.currentWord.length; i++) {
    wordArray.push('_');
  }
  this.wordArray = wordArray;
}

Game.prototype.makeGuess = function(letter) {
  letter = letter.toLowerCase();
  if (this.guessedLetters.indexOf(letter) != -1)
    return false;
  this.guessedLetters.push(letter.toLowerCase());
  var comparison = this.currentWord.split('');
  var matches = getAllIndexes(comparison, letter);
  for (var i = 0; i < matches.length; i++) {
    this.wordArray[matches[i]] = letter;
  }
  if (matches.length === 0)
    this.guessesRemaining--;

  return true;
};

// Borrowed from http://stackoverflow.com/questions/20798477/how-to-find-index-of-all-occurrences-of-element-in-array
function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

exports.gameModule = Game;

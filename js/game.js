var testWord = 'letter';

function Game() {
  this.guessesRemaining = 10;
  this.guessedLetters = [];
}

Game.prototype.setupWord = function() {
  this.currentWord = testWord;
};

Game.prototype.makeGuess = function(letter) {
  console.log('Game.prototype.makeGuess()');
  if (this.guessedLetters.indexOf(letter) != -1)
    return false;
  this.guessedLetters.push(letter.toLowerCase());

  return true;
};


exports.gameModule = Game;

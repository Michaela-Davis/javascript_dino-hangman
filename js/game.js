var testWord = 'letter';

function Game() {
  this.guessesRemaining = 10;
  this.guessedLetters = [];
}

Game.prototype.setupWord = function() {
  this.currentWord = testWord;
};



exports.gameModule = Game;

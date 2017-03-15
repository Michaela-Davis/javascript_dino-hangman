// USER INTERFACE

var Game = require('./../js/game.js').gameModule;

var alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

var currentGameObject;

$(document).ready(function() {
  $('form#new-game').submit(function(event) {
    event.preventDefault();
    currentGameObject = new Game();
    currentGameObject.setupWord();
    updateGameDisplay(currentGameObject);
    $('#game-display').show();
  });

  $('form#guess-form').submit(function(event) {
    event.preventDefault();
    var guess = $('#guess').val().slice(0, 1);
    $('#guess').val('');
    makeGuess(currentGameObject, guess);
  });
});

function updateGameDisplay(game) {
  var blanks = game.wordArray.join(' ');
  $('p#blanks').text(blanks);

  var alphabetDisplay = '';
  for (var i = 0; i < alphabet.length; i++) {
    var letter = alphabet[i];
    alphabetDisplay += (game.guessedLetters.indexOf(letter) == -1 ? letter : '_') + ' ';
  }
  $('p#letters-guessed').text(alphabetDisplay);

  $('#guess-countdown').text(game.guessesRemaining);
}

function makeGuess(game, letter) {
  if (game.makeGuess(letter))
    updateGameDisplay(game);
  else {
    alert('You have already guessed that letter!');
  }
}

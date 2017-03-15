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
    newGame();
  });

  $('form#guess-form').submit(function(event) {
    event.preventDefault();
    var guess = $('#guess').val().slice(0, 1);
    $('#guess').val('');
    makeGuess(currentGameObject, guess);
  });
});

function newGame() {
  $.get('http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=1&words=1')
    .then(function(json) {
      currentGameObject = new Game(json[0][0]);
      updateGameDisplay(currentGameObject);
      $('form#guess-form').show();
      $('#game-display').show();
    });
}

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
  if (game.makeGuess(letter)) {
    updateGameDisplay(game);
    if (checkForEndGame(game) === -1) {
      $('form#guess-form').hide();
      showAnswer(game);
      alert('You lose :(');
    }
    if (checkForEndGame(game) === 1) {
      $('form#guess-form').hide();
      alert('You win :D');
    }
  }
  else {
    alert('You have already guessed that letter!');
  }
}

function checkForEndGame(game) {
  if (game.guessesRemaining === 0)
    return -1; //lose
  if (game.wordArray.join('') == game.currentWord)
    return 1; //win
  return 0; //keep playing
}

function showAnswer(game) {
  var answer = game.currentWord.split('').join(' ');
  $('p#blanks').text(answer);
}

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
    alphabetDisplay +=
    (
      game.guessedLetters.indexOf(letter) == -1
      ? "<span class='letter' id='" + letter + "'>" + letter + "</span>"
      : '_'
    ) + ' ';
  }
  $('p#letters-guessed').html(alphabetDisplay);
  if (! checkForEndGame(game)) {
    $('.letter').click(function() {
      var letter = $(this).attr('id');
      makeGuess(game, letter);
    });
  } else {
    $('.letter').removeClass('letter');
  }

  $('#guess-countdown').text(game.guessesRemaining);
  $('img#countdown-image').attr('src', 'img/stegosaurus ' + game.guessesRemaining +'.png');
  $('p#alert').text('Press or click a letter to make a guess.');
}

function makeGuess(game, letter) {
  if (game.makeGuess(letter)) {
    updateGameDisplay(game);
    switch (checkForEndGame(game)) {
      case -1:
        $('form#guess-form').hide();
        showAnswer(game);
        $('p#alert').text('You lose :(');
        break;
      case 1:
        $('form#guess-form').hide();
        $('p#alert').text('You win :D');
        break;
      default:
        break;
    }
  } else {
    $('p#alert').text('You have already guessed that letter!');
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


$(document).ready(function() {
  $('form#new-game').submit(function(event) {
    event.preventDefault();
    newGame();
  });

  $('html').keypress(function(event) {
    var key = event.which;
    var index = null;
    if (key >= 65 && key <= 90)
      index = key - 65;
    else if (key >= 97 && key <= 122)
      index = key - 97;
    if (currentGameObject && ! checkForEndGame(currentGameObject) && index !== null)
      makeGuess(currentGameObject, alphabet[index]);
  });
});

// USER INTERFACE

var Game = require('./../js/game.js').gameModule;

$(document).ready(function() {
  $('form#new-game').submit(function(event) {
    event.preventDefault();
    var currentGameObject = new Game();
    currentGameObject.setupWord();
    setupGameDisplay(currentGameObject);
    $('#game-display').show();
  });
});

function setupGameDisplay(game) {
  var letters = game.currentWord.length;
  var blanks = '';
  for (var i = 0; i < letters; i++) {
    blanks += '_ ';
  }
  $('p#blanks').text(blanks);
}

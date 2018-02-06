// Bryt ut till json
var words = [
  {
    "clue": "Egyptisk geometri",
    "word": "pyramid",
    "start": [2,1],
    "end": [2,7]
  },
  {
    "clue": "Valfläsk",
    "word": "späck",
    "start": [1,1],
    "end": [5,1]
  },
  {
    "clue": "Klassisk godisbollsmak",
    "word": "arak",
    "start": [1,3],
    "end": [4,3]
  },
  {
    "clue": "Träd",
    "word": "al",
    "start": [3,3],
    "end": [3,4]
  },
  {
    "clue": "Sort",
    "word": "slag",
    "start": [1,1],
    "end": [1,4]
  },
  {
    "clue": "Därför",
    "word": "ty",
    "start": [1,2],
    "end": [2,2]
  },
  {
    "clue": "Vild och …",
    "word": "galen",
    "start": [1,4],
    "end": [5,4]
  },
  {
    "clue": "Fordon liksom med återkommande frekvens",
    "word": "cykel",
    "start": [4,1],
    "end": [4,5]
  },
  {
    "clue": "Tiokamp",
    "word": "dekatlon",
    "start": [2,7],
    "end": [9,7]
  }
];

/**
 * Crossword
 * © WeeHorse v/s TinyHorse
 * https://github.com/WeeHorse
 */

$(init);

$(document).on('submit', '#board', function(e){
  e.preventDefault();
  test();
  $('#points').html('Points: ' + wordPoints);
});



var bw = 9,
    bh = 9,
    wordPoints = 0;

function init(){
  // make board
  var html = ['<table>'];
  for(var x = 0; x<=bw; x++){
  // for(var x = 1; x<=bw; x++){
    html.push('<tr>');
    for(var y = 0; y<=bh; y++){
      var id = 'x' + x + 'y' + y;
      if(x == 0 && y == 0){
        html.push('<th></th>');
      }else if(x == 0){
        html.push('<th>' + y + '</th>');
      }else if (y == 0){
        html.push('<th>' + x + '</th>');
      }else{
        html.push('<td><input type="text" name="' + id + '" id="' + id + '"></td>');
      }
    }
    html.push('</tr>');
  }
  html.push('</table>');
  html.unshift('<input type="submit" id="submit" value="svara"/>');
  html.unshift('<label for="correct">Visa facit</label><input type="checkbox" id="correct"/>');
  $('#board').html(html.join(''));


  // print clues
  var html = [], direction, start, word;
  for(var i = 0; i < words.length; i++){
    word = words[i];
    if(word.start[0] == word.end[0]){
      direction = 'Lodrät';
      start = word.start[0];
    }else{
      direction = 'Vågrät';
      start = word.start[1];
    }
    html.push(direction + ' ' + start + ' "' + word.clue + '" (' + word.word.length + ' bokstäver)');
  }
  $('#clues').html('<p>' + html.join('</p><p>') + '</p>');
}


// Gör om till riktig funktion och bättre namn än "test"
var test = function(){
  for(var i = 0; i < words.length; i++){
    test2(words[i]);
  }
}

// Gör om till riktig funktion och bättre namn än test2
var test2 = function(word){
  var x, y, letter, testLetter, testWord = '', id, matchJqEls = [];
  if(word.start[0] == word.end[0]){
    // LODRÄT:
    y = word.start[0];
    for(x = word.start[1]; x <= word.end[1]; x++){
      letter = word.word.charAt(x-word.start[1]);
      id = '#x' + x + 'y' + y;
      testLetter = $(id).val().toLowerCase();
      if(testLetter && testLetter == letter){
        testWord += letter;
        matchJqEls.push(id);
      }
      if($('#correct:checked').length){
        $(id).val(letter);
      }else{
        if(testWord && testWord == word.word){
          wordPoints++;
          console.log('word',word.word,'complete match');
          for(var j = 0; j < matchJqEls.length; j++){
            $(matchJqEls[j]).attr('disabled','disabled');
          }
        }
      }
    }
  }else{
    // VÅGRÄT:
    x = word.start[1];
    for(y = word.start[0]; y <= word.end[0]; y++){
      letter = word.word.charAt(y-word.start[0]);
      id = '#x' + x + 'y' + y;
      testLetter = $(id).val().toLowerCase();
      if(testLetter && testLetter == letter){
        testWord += letter;
        matchJqEls.push(id);
      }
      if($('#correct:checked').length){
        $(id).val(letter);
      }else{
        if(testWord && testWord == word.word){
          wordPoints++;
          console.log('word',word.word,'complete match');
          for(var j = 0; j < matchJqEls.length; j++){
            $(matchJqEls[j]).attr('disabled','disabled');
          }
        }
      }
    }
  }
}

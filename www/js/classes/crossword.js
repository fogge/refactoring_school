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
  objectIterator();
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
  printClues();
}

  function checkDirection(eachWordObj){
    if (eachWordObj.start[0] == eachWordObj.end[0]) {
      return 'Lodrät';
    } else {
      return 'Vågrät';
    }
  }

  // print clues
  function printClues(){
    let infoContainer = [];
    for(var i = 0; i < words.length; i++){
      let eachWordObj = words[i];
      let direction = checkDirection(words[i]);
      let startPosition;
      if(direction == 'Lodrät'){
        startPosition = eachWordObj.start[0];
      }else{
        startPosition = eachWordObj.start[1];
      }
      infoContainer.push(direction + ' ' + startPosition + ' "' + eachWordObj.clue + '" (' + eachWordObj.word.length + ' bokstäver)');
    }
    $('#clues').html('<p>' + infoContainer.join('</p><p>') + '</p>');
  }


// Gör om till riktig funktion och bättre namn än "test"
function objectIterator(){
  for(var i = 0; i < words.length; i++){
    test2(words[i]);
  }
}


function vertical(){

}

// Gör om till riktig funktion och bättre namn än test2
function test2(eachWordObj){
  var x, y, letter, testLetter, testWord = '', id, matchJqEls = [];
  let startYPositionY;
  let letterOfWord;
  let inputLetter;
  let inputWord = "";
  if(checkDirection(eachWordObj) == "Lodrät"){
    // LODRÄT:
    startPositionY = eachWordObj.start[0];
    for(let startPositionX = eachWordObj.start[1]; startPositionX <= eachWordObj.end[1]; startPositionX++){
      letterOfWord = eachWordObj.word.charAt(startPositionX-eachWordObj.start[1]);
      id = '#x' + startPositionX + 'y' + startPositionY;
      console.log(id);
      inputLetter = $(id).val().toLowerCase();
      if(inputLetter === letterOfWord){
        inputWord += inputLetter;
        matchJqEls.push(id);
      }

      if($('#correct:checked')){
        $(id).val(letterOfWord);
      }else if(inputWord == eachWordObj.word){
          wordPoints++;
          console.log('word',eachWordObj.word,'complete match');

          for(let j = 0; j < matchJqEls.length; j++){
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

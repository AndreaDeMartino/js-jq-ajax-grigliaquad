// Descrizione:
// Griglia 6x6 (36 boxes), ad ogni click parte una richiesta AJAX che prende un numero random da 1 a 9 (scegliere API opportuna).
// Se è <= 5 il quadrato diventa giallo, se è > di 5 il quadrato diventa verde.
// Il numero ottenuto appare al centro del quadrato
// DevTools console e network sono nostri amici :wink:
// Nome della repo per consegnare l’esercizio: js-jq-ajax-grigliaquad

$(document).ready(function () {
  var randomNumber = 0;
  var boxContainer = $('.boxes--container');
  var btnAutoGrid = $('#button--auto-grid');
  var btnExercise = $('#button-exercise');
  var apiUrl = 'https://flynn.boolean.careers/exercises/api/random/int';

  /****************************************************
  * EXERCISE
  ****************************************************/

  // Generate 36 Boxes with "EXERCISE" Button
  btnExercise.click(function(){
    for (var i = 0; i< 36; i++){
      // Handlebars Config
      var source = $("#message-template").html();
      var template = Handlebars.compile(source);
      // Creation of Object box
      // Get html template with dinamic values
      var html = template();
      // Add html template on chat container and clean inputbox
      boxContainer.addClass('exercise').append(html).hide().fadeIn(300); 
    }
  })

  // Click on Box management
  $('#app').on('click', '.box', function(){
    var box = $(this);
    $.ajax({
      url: apiUrl,
      method: 'GET',
      success: function (data){
        if (box.text() == 0){
          box.text(data.response);
          if (data.response <= 5){
            box.addClass('box__yellow');
          } else{
            box.addClass('box__green');
          }
        }
      },
      error: function(){
        console.log('errore api');
      }
    })
  })

  /****************************************************
  *  BONUS: Create Custom Grid with random numbers
  ****************************************************/

  // Generate custom grid with "AUTO GRID" button
  btnAutoGrid.click(function(){
    var gridNumber = parseInt(prompt('Inserisci il numero dei box (ogni riga è formata da 6 elementi)'));
    for (var i = 0; i< gridNumber; i++){
      // Api
      $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function (data){
          randomNumber = data.response;
          // Handlebars Config
          var source = $("#message-template").html();
          var template = Handlebars.compile(source);
          // Creation of Object box
          var box = {
            number: randomNumber
          }
          // Get html template with dinamic values
          var html = template(box);
          // Add html template on chat container and clean inputbox
          boxContainer.addClass('bonus').append(html); 
        },
        error: function(){
          console.log('Api in errore');
        }
      })
    }
  })

});
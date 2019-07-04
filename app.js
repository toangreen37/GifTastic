//Initial array of movies	
$(document).ready(function() {

  let topics = ["Chinchilla", "Golden Retriever", "Samoyed", "Polar Bear", "Red panda", "Kitten", "Bunny", "Husky", "Shiba Inu", "Artic Fox"];	

  //  create topics array buttons
  function renderButtons(){
    $('#buttons-view').empty();

    for (var i = 0; i < topics.length; i++) {
            //create all buttons
            let a = $('<button>');
            a.addClass('critter');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttons-view').append(a);
          }
        }    
        renderButtons();

//on button click
$(document).on('click', '.critter', function() {

    //new variable will log the text data from each button
    const animal = $(this).html(); 
  

    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    // console.log(queryURL);

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      const results = response.data;
        //console.log(results);
        //empties the div before adding more gifs
        $('#critter-view').empty();
        for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                        // console.log(imageView);  

        const gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    gifImage.attr('data-state', 'still');
                    $('#critter-view').prepend(gifImage);
                    gifImage.on('click', playGif);

        // Pulling ratings for each movie
        const rating = results[j].rating;
            // console.log(rating);
        const displayRated= $('<p>').text("Rating: " + rating);
        $('#critter-view').prepend(displayRated);
  } // end for loop

}); // done response

        //function to stop and animate gifs
        function playGif() { 
                    const state = $(this).attr('data-state');
                    // console.log(state);
                 if (state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                      $(this).attr('data-state', 'animate');
                 } else{
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                } //end of on click function

      }); //end of document on click 

          //adding new button to array
        $(document).on('click', '#add-animal', function(){
            if ($('#animal-input').val().trim() == ''){
              alert('Input can not be left blank');
           }
           else {
            const animal = $('#animal-input').val().trim();
            topics.push(animal);
            $('#animal-input').val('');
            renderButtons();
            return false;

            }

        });
                      

        }); // end click function


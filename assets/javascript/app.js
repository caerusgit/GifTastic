var movies = ["Mammals", "Birds", "Reptiles", "Amphibians", "Fishes", "Insects", "Crustaceans", "Arachnids", "Echiniderms", "Worms", "Mollusks", "Sponges"];





// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {

    var movie = $(this).attr("data-name");

    // var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&tag=" + movie;

    // Creates AJAX call for the specific movie button being clicked

for (let i = 0; i < 10; i++) {




    $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
            console.log("Response", response);
          var results = response.data;
          console.log("Results", results);


            var gifDiv = $("<div>");

            var title = results.title;

            var p = $("<p>").text(title);

            var personImage = $("<img>");
            
            personImage.attr({
				"src": results.images.original_still.url,
				"data-still": results.images.original_still.url,
				"data-animate": results.images.original.url,
				"data-state": "still",
				"class": "gif"
            });

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#movies-view").prepend(gifDiv);
          
        });




    
}











}








// Function for displaying movie data
function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of movies
    for (var i = 0; i < movies.length; i++) {

        // Then dynamicaly generates buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of movie to our button
        a.addClass("movie");
        // Added a data-attribute
        a.attr("data-name", movies[i]);
        // Provided the initial button text
        a.text(movies[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}








// This function handles events where the add movie button is clicked
$("#add-animal").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var movie = $("#animal-input").val().trim();

    // The movie from the textbox is then added to our array
    movies.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

    $("#animal-input").val("");
});









	   // This line selects ALL elements with the "gif" class and adds
	   // an event handler for the "click" event
    //    $(".gif").on("click", function() {
        $(document).on("click", ".gif", function() {

        // alert("Funcionar $('.gif').on('click', function() {");
            
                
            // $(this) just means "the element with class 'gif' that was clicked"
        var state = $(this).attr("data-state");
        
        // $(this).attr("data-state") will either be "still" or "animate"
        // IF it's still: we change it to animate
        if (state === "still") {
            
            var newSrc = $(this).attr("data-animate");
            $(this).attr("src", newSrc);
            $(this).attr("data-state", "animate");
            
            // OTHERWISE it's animate already, so we change it to still
        } else {
            var newSrc = $(this).attr("data-still");
            $(this).attr("src", newSrc);
            $(this).attr("data-state", "still");
        }
    });










// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".movie", displayMovieInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();
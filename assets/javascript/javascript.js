$(document).ready(function(){
// Create an array of reactions
var reactions = ["Amazed","Laughing","Popcorn","Happy","Sad","Joking","Afraid","Confused","Excited","Scared","Loving"];
// Function to display gif buttons
function displayGifButtons(){
    $("#gifButtonsView").empty();
    for (var i = 0; i < reactions.length; i++){
        var gifBtn = $("<button>");
        gifBtn.addClass("reaction");
        gifBtn.addClass("btn btn-primary")
        gifBtn.attr("data-name", reactions[i]);
        gifBtn.text(reactions[i]);
        $("#gifButtonsView").append(gifBtn);
    }
}
// Function to add new buttons
function addNewbtn(){
    $("#addGif").on("click", function(){
        var reaction = $("#reaction-input").val().trim();
        if(reaction ==""){
            return false;
        }
        reactions.push(reaction);
        displayGifButtons();
        return false;
    });
}

// Function that displays all gifs
function displayGifs(){
    var reaction = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=reaction&api_key=atk6O1ryEZSYfP044NPMEO0BTftlnQZP&limit=10";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response);
        $("#gifsView").empty();
        var results = response.data;
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); //div for the gifs to go inside
            gifDiv.addClass("gifDiv");
            // pulling rating of gif
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            // pulling still image of gif
            // adding div of gifs to gifsView div
            $("#gifsView").prepend(gifDiv);
        }
    });
}
// Calling Functions & Methods
displayGifButtons(); // displays list of reactions already created
addNewbtn();

// Document Event Listeners
$(document).on("click", ".reaction", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});

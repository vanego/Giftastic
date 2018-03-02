// my initial buttons array.
var breeds = ["Dalmatian", "Pug", "Poodle", "Chihuahua"];

// adding click event listen to all buttons
$("body").on("click", "button" , function() {
    
    console.log("data-animal");

    // grabbing and storing the data-animal property value from the button
    var breed = $(this).attr("data-animal");

    // constructing  queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + breed + "&api_key=pz8wBwissFXG24GFqqH7aHnzVR1dzw48";

    // performing an AJAX request with queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    // after data comes back from the request
    .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var animalDiv = $("<div>");

            // creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating:" + results[i].rating);

            // creating the variable animal imgage
            var animalImage = $("<img>");

            // setting the src attribute of the image to a property pulled off the results item
            animalImage.attr("src", results[i].images.fixed_height.url);
            // appending the paragraph and image tag to 
            animalDiv.append(p);
            animalDiv.append(animalImage);

            // prepending the animalDiv to html page
            $("#giphy").prepend(animalDiv);




        }
    });

});
// function that will create buttons out of my array
function renderButtons() {

    $(".buttons").empty();

    // loops through my list
    for (var i = 0; i < breeds.length; i++) {
        var a = $("<button>");
        a.addClass("breed");
        a.attr("data-animal", breeds[i]);
        a.text(breeds[i]);
        $(".buttons").append(a);
    }
}

renderButtons();

// add user buttons to existing array
$("#addSearch").on("click", function(event) {
    event.preventDefault();

    var newTopic = $("#user-input").val().trim();

    breeds.push(newTopic);

    renderButtons();

});



// get gifs to pause and 
// $(".gif").on("click", function() {
//       // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
//       var state = $(this).attr("data-state");
//       // If the clicked image's state is still, update its src attribute to what its data-animate value is.
//       // Then, set the image's data-state to animate
//       // Else set src to the data-still value
//       if (state === "still") {
//         $(this).attr("src", $(this).attr("data-animate"));
//         $(this).attr("data-state", "animate");
//       } else {
//         $(this).attr("src", $(this).attr("data-still"));
//         $(this).attr("data-state", "still");
//       }
//     });
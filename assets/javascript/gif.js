// my initial buttons array.
var breeds = ["Dalmatian", "Pug", "Poodle", "Chihuahua"];


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

	// adding click event listen to all buttons
	$("button").on("click", function() {
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

				// breating a paragraph tag with the result item's rating
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





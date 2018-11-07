
var api_Key = "FrAfCkgZ9Zx55XRZn1U3yYUdnsf7NQcA";
var buttons = ["alligator", "bugs", "plants", "dogs", "elephants", "frogs"];

$(document).ready(function () {

	for (var i = 0; i < buttons.length; i++) {
		var giphyBtn = $("<button>");
		giphyBtn.attr("data-gifName", buttons[i]);
		giphyBtn.text(buttons[i]);
		$("#buttons").append(giphyBtn);
	}

	$("button").on("click", function () {
		var giphy = $(this).attr("data-gifName");
		// var state = $(this).attr("data-state");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=" + api_Key + "&limit=2";

		$.ajax({
			url: queryURL,
			method: "GET"
		})
			.then(function (response) {
				var results = response.data;


				for (var i = 0; i < results.length; i++) {
					var giphyDiv = $("<div>");
					var p = $("<p>").text("Rating: " + results[i].rating);
					var giphyImage = $("<img>");

					giphyImage.attr("src", results[i].images.fixed_height_still.url);
					giphyImage.attr("data-still", results[i].images.fixed_height_still.url);
					giphyImage.attr("data-animate", results[i].images.fixed_height.url);
					giphyImage.attr("data-state", "still");

					// giphyImage.attr("data-state data-animate", queryURL + ".gif");
					giphyImage.addClass("gif");

					giphyDiv.append(p);
					giphyDiv.append(giphyImage);
					console.log(queryURL);
					$(".gifDisplay").prepend(giphyDiv);
					var state = $(this).attr("data-state");
					console.log(state);
			
					// var state = $(this).attr("data-state");

					// if (state === "still") {
					// 	$(this).attr("src", $(this).attr("data-animate"));
					// 	$(this).attr("data-state", "animate");
					// } else {
					// 	$(this).attr("src", $(this).attr("data-still"));
					// 	$(this).attr("data-state", "still");
					// }


				}
			});
	});

	$(".img").on("click", function () {

		var state = $(this).attr("data-state");
		console.log(state);

		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	});

});
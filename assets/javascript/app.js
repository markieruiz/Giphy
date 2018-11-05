

var api_Key = "FrAfCkgZ9Zx55XRZn1U3yYUdnsf7NQcA";
var buttons = ["alligator", "bugs", "plants", "dogs", "elephants", "frogs"];


$(".start").on("click", function () {

	for (var i = 0; i < buttons.length; i++) {
		var giphyBtn = $("<button>");
		giphyBtn.attr("data-giphy", buttons[i]);
		giphyBtn.text(buttons[i]);
		$("#buttons").append(giphyBtn);
		console.log(giphyBtn);
	}
});

$("#buttons").on("click", function () {
	console.log(buttons);

	var giphyBtn = $("#buttons").attr("data-giphy");
	console.log(giphyBtn);
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttons + "&api_key=" + api_Key + "&limit=2";

	$.ajax({
		url: queryURL,
		method: "GET"
	})
		.then(function (response) {
			console.log(queryURL);
			console.log(response);
			var results = response.data;

			for (var i = 0; i < results.length; i++) {
				var giphyDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var giphyImage = $("<img>");

				giphyImage.attr("src", results[i].images.fixed_height.url);
				giphyDiv.append(p);
				giphyDiv.append(giphyImage);

				$(".gifDisplay").prepend(giphyDiv);
			}
		});
	});
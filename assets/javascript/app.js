
var api_Key = "FrAfCkgZ9Zx55XRZn1U3yYUdnsf7NQcA";
var topics = ["Aardvark", "Baboon", "Camel", "Deer", "Elephant", "Ferret", "Gerbil", "Hyena"];

$(document).ready(function () {
	addingButtons();

	function addingButtons() {
		$("#buttons").empty();
		for (var i = 0; i < topics.length; i++) {
			var giphyBtn = $("<button>");
			giphyBtn.addClass("buttonWords");
			giphyBtn.attr("data-gifName", topics[i]);
			giphyBtn.text(topics[i]);
			$("#buttons").append(giphyBtn);
		}
	}

	$(document).on("click", ".buttonWords", function () {
		var giphy = $(this).attr("data-gifName");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=" + api_Key + "&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		})
			.then(function (response) {
				var results = response.data;
				console.log(response);

				for (var i = 0; i < results.length; i++) {
					var giphyDiv = $("<div>");
					var title = results[i].title;
					var _txt = title.charAt(0).toUpperCase() + title.slice(1);
					var shortText =  jQuery.trim(_txt).substring(0, 20)
					.split(" ").slice(0, -1).join(" ");

					var t = $("<p>").text("Title: " + shortText);
					var r = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
					var giphyImage = $("<img>");

					giphyImage.attr("src", results[i].images.fixed_height_still.url);
					giphyImage.attr("data-still", results[i].images.fixed_height_still.url);
					giphyImage.attr("data-animate", results[i].images.fixed_height.url);
					giphyImage.attr("data-state", "still");
					giphyImage.addClass("gif");

					giphyDiv.append(t);
					giphyDiv.append(r)
					giphyDiv.append(giphyImage);
					$(".gifDisplay").prepend(giphyDiv);
					var state = $(this).attr("data-state");

				}
			});
	});

	$(document).on("click", ".gif", function () {
		var state = $(this).attr("data-state");

		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	});

	$("#giphy-input").keypress(function () {
		var _val = $("#giphy-input").val();
		var _txt = _val.charAt(0).toUpperCase() + _val.slice(1);
		$("#giphy-input").val(_txt);
})

	$("#find-giphy").on("click", function () {
		event.preventDefault();
		var input = $("#giphy-input").val();
		input.toUpperCase();

		if ($("#giphy-input").val().length == 0) {
			alert("You did not enter a value");
		}

		else {
		topics.push(input);
		console.log(topics);
		addingButtons();
		$("#giphy-input").val('');
		}
	});

});
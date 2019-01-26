$(document).ready(function () {
	console.log("hello, I am ready!");
    // array for buttons! 
var superMarioButtons = ["mario", "luigi", "toad", "yoshi", "bowser", "donkey kong", "princess peach", "1up"];
function renderButtons() {
	console.log("hello I am in renderButtons");

	$("#gif-buttons").empty();
	for (i = 0; i < superMarioButtons.length; i++) {
		$("#gif-buttons").append("<button class='btn btn-success gif-btn' data-gif='" + superMarioButtons[i] + "'>" 
		+ superMarioButtons[i] + "</button>");
	}
	console.log(superMarioButtons);
}
// button for gifs
$("#add-gif").on("click", function () {
	console.log("hello! I am adding buttons!");
	event.preventDefault();
	var marioButtons = $("#gif-input").val().trim();
	superMarioButtons.push(marioButtons);
	renderButtons();
	return;
});

// 2nd try- listening to the parent, instead of the child OR ELSE it wont work
$("#gif-buttons").on("click", '.gif-btn', function () {
console.log("and I am attributes");
var superMarioNames = $(this).attr("data-gif");
console.log(superMarioNames);
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
	superMarioNames + "&api_key=Gvwrg1aV681jlrFK7OlOsVYDxSMmfTYF"
	console.log(queryURL);
    $.ajax({
	url: queryURL,
	method: "GET"
	}).done(function (response) {
		var results = response.data;
		$("#populatedGifs").empty();
		for (var i = 0; i < results.length; i++) {
            var populatedGifs = $("<div>");
			var p = $("<p>").text("Rating: " + results[i].rating);
            var marioGif = $("<img>");
	    marioGif.attr("src", results[i].images.original_still.url);
	    marioGif.attr("data-still", results[i].images.original_still.url);
	    marioGif.attr("data-animate", results[i].images.original.url);
	    marioGif.attr("data-state", "still");
	    marioGif.attr("class", "gif");
	    populatedGifs.append(p);
	    populatedGifs.append(marioGif);
	    $("#populatedGifs").append(populatedGifs);
		}
	});
});
// setting still attributes
function changeState(){
	var state = $(this).attr("data-state");
	var animateGif = $(this).attr("data-animate");
	var stillGif = $(this).attr("data-still");

	if (state == "still") {
		$(this).attr("src", animateGif);
		$(this).attr("data-state", "animate");
	}
        else if (state == "animate") {
	        $(this).attr("src", stillGif);
			$(this).attr("data-state", "still");
		}
	}
$(document).on("click", ".gif", changeState);
renderButtons();

});
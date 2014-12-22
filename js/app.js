
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

});
	/*All variables used*/
	var gameNumber;
	var generatedNumber;
	var guess;
	var count = 0;
	var found = true;
	
	/*Start a new game*/
	newGame(); 

	$(".new").click(function(event) {
		event.preventDefault();
		newGame();
	});
	
	function newGame() {
		randomNumber = generateNumber();
		count = 0;
		guessCount();
		clearField();
		$('#feedback').text("Make your Guess");
		clearNumbers();
	}	  
	
	/*Automatically generate number*/
	function generateNumber() {
		generatedNumber = Math.floor((Math.random()*100)+1);
		console.log("Generated number = " + generatedNumber);
		return generatedNumber;
	}
	/*capture user guess*/
	$('form').submit(function(event) {
		event.preventDefault();
		guess = $('#userGuess').val();
		if (guess % 1 != 0) {
			changeFeedback("Please enter a whole number");
   		 } else if (guess < 1 || guess > 100) {
    		changeFeedback("Please choose between 1 and 100");
    	} else {
			if (found) {
				console.log("user choice " + guess);
				count += 1;
				difference();
				feedBack();
				guessCount();
				clearField();
				trackNumbers(guess);
				$('#userGuess').focus();
			} else {
				changeFeedback("You already won this game. \n\r Please start a new one.");
			}
		} 
	})
	/*find difference*/
 	function difference() { 
 		return Math.abs( generatedNumber - guess); 
 	}
	/*change feedback area text*/
	var changeFeedback = function(text) { 
		$('#feedback').text(text);
	}
 	/*feedback*/
 	function feedBack() {
 		if (difference() === 0) {
 			changeFeedback("You win!");
 			found = false;
 			return false;
		} else if (difference() <= 10) {
			changeFeedback("Breaking a sweat now");
			return true;
		} else if (difference() <= 20) {
			changeFeedback("Getting warmer");
			return true;
		} else if (difference() <= 30) { 
			changeFeedback("Man, it's getting chilly");
			return true;
		} else if (difference() <= 40) {
			changeFeedback("Okay, now it's freezing");
			return true;
		} else {changeFeedback("Frostbite warning!"); 
			return true;
		}
	}
	/*guess count*/
	function guessCount() {
 		$('#count').text(count);
	}
	/*clear form field*/
	function clearField(text) {
		$('#userGuess').val(text);
	}
	/*track numbers*/
	function trackNumbers(num) {
		$('#guessList').append("<li>" + num + "</li>");
	}
	function clearNumbers() {
		$("#guessList li").remove();
	}
});
var pokemon = ["Voltorb","Articuno","Diglett","Eevee","Exeggcute","Pidgeot","Pikachu","Poliwhirl","Slowpoke"];

var pokeList = ["Jigglypuff", "Articuno","Joleton","Diglett","Exeggcute","Pidgeot","Pikachu",
	"Poliwhirl","Slowpoke","Voltorb","Ponyta","Doduo","Abra",
	"Fearow","Nidorina","Clefairy","Vulpix","Ninetales","Zubat","Sandshrew","Wigglytuff","Oddish",
	"Persian","Primeape","Meowth","Parasect","Onix","Krabby","Eevee"];

var questions;

var theme =  new Audio('assets/audio/youwin.mp3');

function questionObj(index,pokemon)//define my question object
  {
  	this.index = index;
    this.qpic = "assets/images/q" + index + ".jpg";
    this.apic = "assets/images/a" + index + ".jpg";
    this.answer = Math.floor(Math.random() * 4);
    this.makeAnswers = function()//make a list of answers
    {
    	var answerList =[" "];

    	for (var i = 0; i < 4; i++) 
    	{//create a list of possible answers.
    		var goodName = 0;
    		if(i == this.answer)
    		{
    			answerList[i] = pokemon;//insert the real answer into a random location
    		}
    		else//make sure we grab a name that's not the answer and put it into the other slots
    		{
    			var somePokemon = pokeList[Math.floor(Math.random() * (pokeList.length - 1))];
    			while(goodName == 0)
    			{
    				if(somePokemon == pokemon)
    				{
    					somePokemon = pokeList[Math.floor(Math.random() * (pokeList.length - 1))];
    				}
    				else if(answerList.includes(somePokemon))
    				{
    					somePokemon = pokeList[Math.floor(Math.random() * (pokeList.length - 1))];
    				}
    				else
    				{
    					answerList[i] = somePokemon;
    					goodName = 1;
    				}
    			}
    			
    		}
    		
    	}
    	return answerList;
    },
    this.answers = this.makeAnswers();
};



var game = {

  time: 0,
  question: 0,
  timeID: 0,
  right:0,
  wrong:0,
  noans:0,
  myDivGameArea: $("#gameArea"),
  myDivTimeRemaining:$("<div/>", {"id": "timeRemaining"}),
  myDivQuestion:$("<div/>", {"id": "questionPic"}),
  myDivAnswer1:$("<div/>", {"class": "answer"}),
  myDivAnswer2:$("<div/>", {"class": "answer"}),
  myDivAnswer3:$("<div/>", {"class": "answer"}),
  myDivAnswer4:$("<div/>", {"class": "answer"}),
  initialize: function() {//set up the first question and initialize the div and variables
    game.time = 10;
    game.question = 0;
    game.right =0;
    game.wrong =0;
    game.noans = 0;
    questions = [" "];
    $(pokemon).each(function(index,item)
    {
    	// create the questions
    	questions[index] = new questionObj(index,item);
    });
	game.myDivGameArea.empty();
    game.myDivGameArea.append(game.myDivTimeRemaining);
    game.myDivGameArea.append("<div><h4 class='text-center' id = 'prompt'>Can you guess the Pokemon?</h4></div>");
    game.myDivGameArea.append(game.myDivQuestion.html('<img src= '+ questions[game.question].qpic +' class ="question rounded mx-auto d-block img-fluid"/>'));
    game.myDivGameArea.append(game.myDivAnswer1.html(questions[game.question].answers[0]));
    game.myDivAnswer1.attr("data-a",0);
    game.myDivGameArea.append(game.myDivAnswer2.html(questions[game.question].answers[1]));
    game.myDivAnswer2.attr("data-a",1);
    game.myDivGameArea.append(game.myDivAnswer3.html(questions[game.question].answers[2]));
    game.myDivAnswer3.attr("data-a",2);
    game.myDivGameArea.append(game.myDivAnswer4.html(questions[game.question].answers[3]));
    game.myDivAnswer4.attr("data-a",3);
    $(game.myDivAnswer1).addClass("answer");
  	$(game.myDivAnswer2).addClass("answer");
  	$(game.myDivAnswer3).addClass("answer");
  	$(game.myDivAnswer4).addClass("answer");
  	var audio = new Audio('assets/audio/pokewho.wav');
    audio.play();
    $("#timeRemaining").text("Time Remaining: " + game.time);
    game.timeID = setInterval(function(){ game.count(); }, 1000);
  	},    
  newQuestion: function() {//set up the next question
  	game.question++;
  	game.time = 10;
  	$("#prompt").text("Can you guess the Pokemon?");
  	$(game.myDivQuestion).html('<img src= '+ questions[game.question].qpic +' class ="question rounded mx-auto d-block img-fluid"/>');
  	$(game.myDivAnswer1).text(questions[game.question].answers[0]);
  	$(game.myDivAnswer2).text(questions[game.question].answers[1]);
  	$(game.myDivAnswer3).text(questions[game.question].answers[2]);
  	$(game.myDivAnswer4).text(questions[game.question].answers[3]);
  	$(game.myDivAnswer1).addClass("answer");
  	$(game.myDivAnswer2).addClass("answer");
  	$(game.myDivAnswer3).addClass("answer");
  	$(game.myDivAnswer4).addClass("answer");
  	var audio = new Audio('assets/audio/pokewho.wav');
    audio.play();
    $("#timeRemaining").text("Time Remaining: " + game.time);
  	game.timeID = setInterval(function(){ game.count(); }, 1000);
  },
  clearDiv: function() {//empty out the game area for a rebuild
  	$(game.myDivAnswer1).empty();
  	$(game.myDivAnswer2).empty();
  	$(game.myDivAnswer3).empty();
  	$(game.myDivAnswer4).empty();
  	$(game.myDivAnswer1).removeClass("answer");
  	$(game.myDivAnswer2).removeClass("answer");
  	$(game.myDivAnswer3).removeClass("answer");
  	$(game.myDivAnswer4).removeClass("answer");
  },
  correct: function() {//you picked the right pokemon!
  	game.right ++;
  	if(game.question < (questions.length -1))
  	{
  		clearInterval(game.timeID);
  		$("#prompt").text("You guessed correctly! it's: " + pokemon[game.question] + "!");
  		$(game.myDivQuestion).html('<img src= '+ questions[game.question].apic +' class ="question rounded mx-auto d-block img-fluid"/>');
  		game.clearDiv();
  		setTimeout(function(){ game.newQuestion(); }, 4000);
  	}
  	else
  	{
  		clearInterval(game.timeID);
  		$("#prompt").text("You guessed correctly! it's: " + pokemon[game.question] + "!");
  		$(game.myDivQuestion).html('<img src= '+ questions[game.question].apic +' class ="question rounded mx-auto d-block img-fluid"/>');
  		game.clearDiv();
  		setTimeout(function(){ game.gameOver(); }, 4000);
  	}
  },
  incorrect: function() {//you picked the right pokemon!
  	game.wrong ++;
  	if(game.question < (questions.length -1))
  	{
  		clearInterval(game.timeID);
  		$("#prompt").text("You guessed wrong! it's: " + pokemon[game.question] + "!");
  		$(game.myDivQuestion).html('<img src= '+ questions[game.question].apic +' class ="question rounded mx-auto d-block img-fluid"/>');
  		game.clearDiv();
  		setTimeout(function(){ game.newQuestion(); }, 4000);
  	}
  	else
  	{
  		clearInterval(game.timeID);
  		$("#prompt").text("You guessed correctly! it's: " + pokemon[game.question] + "!");
  		$(game.myDivQuestion).html('<img src= '+ questions[game.question].apic +' class ="question rounded mx-auto d-block img-fluid"/>');
  		game.clearDiv();
  		setTimeout(function(){ game.gameOver(); }, 4000);
  	}
  },
  outtaTime: function() {//you picked the right pokemon!
  	game.noans ++;
  	if(game.question < (questions.length -1))
  	{
  		clearInterval(game.timeID);
  		$("#timeRemaining").text("Time Remaining: 0");
  		$("#prompt").text("You're outta time! it's: " + pokemon[game.question] + "!");
  		$(game.myDivQuestion).html('<img src= '+ questions[game.question].apic +' class ="question rounded mx-auto d-block img-fluid"/>');
  		game.clearDiv();
  		setTimeout(function(){ game.newQuestion(); }, 4000);
  	}
  	else
  	{
  		clearInterval(game.timeID);
  		$("#timeRemaining").text("Time Remaining: 0");
  		$("#prompt").text("You're outta time! it's: " + pokemon[game.question] + "!");
  		$(game.myDivQuestion).html('<img src= '+ questions[game.question].apic +' class ="question rounded mx-auto d-block img-fluid"/>');
  		game.clearDiv();
  		setTimeout(function(){ game.gameOver(); }, 4000);
  	}
  },
  gameOver: function() {//game over!
  		$("#prompt").text("All done, here's how you did!");
  		$(game.myDivQuestion).html('<img src= "assets/images/pokemongroup.jpg" class ="question rounded mx-auto d-block img-fluid"/>');
  		game.clearDiv();
  		theme.pause();
  		theme =  new Audio('assets/audio/gameover.mp3');
  		theme.play();
  		$(game.myDivQuestion).append('<div class = "text-center"> Correct answers: ' + game.right + '</div>');
  		$(game.myDivQuestion).append('<div class = "text-center"> Incorrect answers: ' + game.wrong + '</div>');
  		$(game.myDivQuestion).append('<div class = "text-center"> Unanswered: ' + game.noans + '</div>');
  		$(game.myDivQuestion).append("<p class='text-center border border-dark rounded' id='start'>Click me to play again!</p>");
  },
  count: function(){//count down from a given number of seconds
  	if(game.time > 0)
  	{
  		$("#timeRemaining").text("Time Remaining: " + game.time);
  		game.time --
  	}
  	else
  	{
  		game.outtaTime();
  	}
  },
  answer: function(answerNum){
  	console.log(answerNum);
  }
};


$(document).on("click", ".answer" , function(){//choose an answer
	if($(this).attr("data-a") == questions[game.question].answer)
	{
		game.correct();
	}
	else
	{
		game.incorrect();
	}

});

$(document).on("click", "#start" , function(){//choose an answer
	theme.pause();
  	theme =  new Audio('assets/audio/youwin.mp3');
  	theme.play();
	game.initialize();
    });
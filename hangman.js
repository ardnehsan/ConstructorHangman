// dependency for inquirer npm package
var inquirer = require("inquirer");

var bank = require('./game.js');
var checker = require('./word.js');
var DisplayGuesses = require('./letter.js');

//global variables
var alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

var lettersGuessed = [];

var lettersCorrect = [];

var displayGame;


var game = {
    wordBank: bank,
    guessesLeft: 10,
    currentWord: null,


startGame : function() 
    {
        this.guessesLeft = 10;
        var random = Math.floor(Math.random() * this.wordBank.length);
        this.currentWord = this.wordBank[random];

        console.log("Avengers Assemble!");

        displayGame = new DisplayGuesses(this.currentWord);
        displayGame.WordDisplay();
        console.log("Guesses Left:" + game.guessesLeft);
        PromptRefresh();
   }
};

//function to show the scores for guesses
function Counters()
{
    console.log("Guesses Left: " + game.guessesLeft);
    console.log("Letters Guessed: " + game.lettersGuessed);
    PromptRefresh();
}

//function to regenerate the input prompt
function PromptRefresh(){
    console.log("");

    if(game.guessesLeft > 0)
    {
        inquirer.prompt([
            {
                type: "value",
                name: "letter",
                message: "Guess a Letter: "
            }
        ]).then(function(userInput){

            var inputLetter = userInput.letter.toLowerCase();

            if(alpha.indexOf(inputLetter) == -1)
            {
                console.log("CANT COMPUTE");
                Counters();
            }
            else if(alpha.indexOf(inputLetter) != -1 && lettersGuessed.indexOf(inputLetter) != -1)
            {
                console.log("ALREADY GUESSED");
                Counters();
            }
            else
            {
                lettersGuessed.push(inputLetter);

                var letterPresent = checker(inputLetter, game.currentWord);

                if(letterPresent)
                {
                    lettersCorrect.push(inputLetter);

                    displayGame = new DisplayGuesses(game.currentWord, lettersCorrect);
                    displayGame.WordDisplay();

                    if(displayGame.win)
                    {
                        console.log("CORRECT!");
                        console.log("The Avenger " + game.currentWord.toUpperCase() + " has saved the day!");
                        return;
                    }
                    else
                    {
                       Counters();
                    }
                }
                else
                {
                    game.guessesLeft--;
                    displayGame.WordDisplay();
                    Counters();
                }
            }
        });
    }
    else
    {
        console.log("Sorry the Earth is doomed");
        console.log("The Avenger you needed was " + game.currentWord.toUpperCase() + ".");
    }
}

game.startGame();
// Start off with a list/array of words that the function can pull from

var selectableWords = [
    "LIGER",
    "PLATYPUS",
    "RHINOCEROS",
    "PYTHON",
    "MANTIS",
    "DOGGO",
    "RAVEN",
    "TAPIR",
    "AXOLOTL",
    "HOATZIN",
    "KAKAPO",
    "QUOKKA",
    "NARWHAL",
    "HUMANS",
];

// Create variables to hold important information

var guessedLetters = [];        

var currentWordIndex;           

var guessingWord = [];         

var remainingGuesses = 0;      

var hasFinished = false;          

var wins = 0;                   

const maxTries = 10;           


// Create a function to hold the reset it to the beginning game screen with a new word

function resetGame() {

    remainingGuesses = maxTries;

    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));

    guessedLetters = [];

    guessingWord = [];

    // create a loop that will make all of the undefined letters

    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {

        guessingWord.push("_");

    }   

    // Hide unneccessary images and text

    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";

    document.getElementById("gameover-image").style.cssText = "display: none";

    document.getElementById("youwin-image").style.cssText = "display: none";

    // Create a function that will update the display when the letter is pressed

    updateDisplay();
};

function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;

    var guessingWordText = "";

    // Display how much of the word we've already guessed on screen.

    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }

    // Updates all the variables in the headings

    document.getElementById("currentWord").innerText = guessingWordText;

    document.getElementById("remainingGuesses").innerText = remainingGuesses;

    document.getElementById("guessedLetters").innerText = guessedLetters;

};

// Create a function that takes the typed letter and checks if it's in the word

function guess(letter) {
    
    var positions = [];

    // Make a loop finding where the guessed letter is and store it in an array

    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {

        if(selectableWords[currentWordIndex][i] === letter) {

            positions.push(i);

        }
    }

    // If it's not in the word, subtract from the remaining guesses

    if (positions.length <= 0) {

        remainingGuesses--;

    } 
    
    // If it's in there, replace the _ with the letter

    else {
        
        for(var i = 0; i < positions.length; i++) {

            guessingWord[positions[i]] = letter;

        }
    }
};

// Check for a win to display the win screen

function checkWin() {

    if(guessingWord.indexOf("_") === -1) {

        document.getElementById("youwin-image").style.cssText = "display: block";

        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";

        wins++;

        hasFinished = true;
    }
};


// Same thing for a loss

function checkLoss() {

    if(remainingGuesses <= 0) {

        document.getElementById("gameover-image").style.cssText = "display: block";

        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";

        hasFinished = true;
    }
}

// Whenever we make a guess, make sure it's a letter we already haven't used

function makeGuess(letter) {

    if (remainingGuesses > 0) {
    
        if (guessedLetters.indexOf(letter) === -1) {

            guessedLetters.push(letter);

            guess(letter);
        }
    }
};


// Event listener for letters pressed

document.onkeydown = function(event) {

    // If the game is either lost or won, reset he game

    if(hasFinished) {

        resetGame();

        hasFinished = false;

    } else {

        // Ensure it will check for A-Z

        if(event.keyCode >= 65 && event.keyCode <= 90) {

            makeGuess(event.key.toUpperCase());

            updateDisplay();

            checkWin();

            checkLoss();
        }
    }
};
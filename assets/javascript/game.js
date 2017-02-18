var hangman;

function Game() {
    this.wins = 0;
    this.correctGuesses = [];
    this.wrongGuesses = [];
    this.currentWord = "";
    this.guessesRemaining = 10;
    this.words = words;

    this.setWord = function() {
        var randomWord = this.words[Math.floor(Math.random() * this.words.length)];

        this.word = randomWord["word"];
        this.blurb = randomWord["blurb"];
        this.image = randomWord["imgLink"];
        this.answerChars = this.answer.split('');

    this.createCurrentWord();
        document.getElementById("hint-image").src = this.image;
        document.getElementById("word").innerHTML = this.word;
        document.getElementById("word-display").innerHTML = this.currentWord;
    
}

this.assignKey = function(key) {
        if (key.match(/[a-z]/i)) {
            
            if (this.answerChars.indexOf(key) == -1 && this.wrongGuesses.indexOf(key) == -1) {
                this.wrongGuesses.push(key);
                this.reduceGuessesRemaining();
                document.getElementById("wrong-guesses").innerHTML = this.wrongGuesses;

                console.log("Character added to wrong guesses: " + key);
                console.log("Currently held wrong guesses: " + this.wrongGuesses);

                
            } else if (this.answerChars.indexOf(key) !== -1 && this.correctGuesses.indexOf(key) == -1) {
                var classQueries = document.getElementsByClassName(key);
                this.correctGuesses.push(key);

                for (var i = 0; i < classQueries.length; i++) {
                    classQueries[i].style.color = "#FFFFFF";
                    classQueries[i].style.borderBottom = "none";
                }

                console.log("Character added to correct guesses: " + key);
                this.checkWin();

            }
        }

        this.createCurrentWord = function() {
        console.group("Current Word");
        for (var charIndex = 0; charIndex < this.answerChars.length; charIndex++) {
            var character = this.answerChars[charIndex];
            console.log("Current character in currentWord array: " + character);
            if (character == " ") {
                var spaceString = "<span class='answer-char'> </span>";
                this.currentWord += spaceString;
            } else {
                var charString = "<span class='answer-char bottom-border " +
                    character + "'>" + character + "</span>";
                this.currentWord += charString;
            }
        }
        console.log("CurrentWord string: " + this.currentWord);
        console.groupEnd();
    }

    // Reduces number of guesses remaining and resets game if 0 remain.
    this.reduceGuessesRemaining = function() {
        if (this.guessesRemaining == 0) {
            this.reset();
        } else {
            this.guessesRemaining--;
            document.getElementById("guess-count").innerHTML = this.guessesRemaining;
        }
    }

    // Resets game area and sets new question.
    this.reset = function() {
        this.guessesRemaining = 10;
        this.currentWord = " ";
        this.correctGuesses = [];
        this.wrongGuesses = [];
        this.setQuestion();
        document.getElementById("guess-count").innerHTML = this.guessesRemaining;
        document.getElementById("wrong-guesses").innerHTML = "";
        console.log("Guesses updated to: " + this.guessesRemaining);
    }

    // Checks if game has been won.
    this.checkWin = function() {
        var hasWon = false;
        for (var answerChar = 0; answerChar < this.answerChars.length; answerChar++) {
            var charCheck = this.answerChars[answerChar];
            console.log(charCheck);

            if (this.correctGuesses.indexOf(charCheck) == -1) {
                hasWon = false;
                break;
            } else {
                hasWon = true;
            }
        }

        console.log("Current answer characters: " + this.answerChars.length);
        console.log("Win status: " + hasWon);

        if (hasWon) {
            var thisGame = this;
            this.wins++;
            document.getElementById("question-image").classList.remove("blur");
            document.getElementById("win-count").innerHTML = this.wins;
            document.getElementById("wrong-guesses").innerHTML = "WINNER!";
            console.log("Wins updated to: " + this.wins);
            setTimeout(function() {
                thisGame.reset();
            }, 5000);

        }
    }
}






    }
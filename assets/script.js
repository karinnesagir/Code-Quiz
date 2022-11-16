// global variables:
var startbutton = document.querySelector("#startbutton");
var startPage = document.querySelector("#startPage");
var quizPage = document.querySelector("#quizPage");
var timer = document.querySelector(".timer");
var question = document.querySelector("#question");
var choiceA = document.querySelector("#a");
var choiceB = document.querySelector("#b");
var choiceC = document.querySelector("#c");
var choiceD = document.querySelector("#d");
var choiceC = document.querySelector("#c");
var button = document.getElementsByClassName("button"); 
var scorePage = document.querySelector("#scorePage");
var highScorePage = document.querySelector("#highScorePage");
var goBackButton = document.querySelector("#goBackButton");
var clearButton = document.querySelector("#clearButton");
var inputIntitials = document.querySelector("#initials");
var finalScore = document.querySelector("#finalScore");
var highscoreNav = document.querySelector("#highscore");
var highScoreInitials = document.querySelector("#highScoreInitials");
var highScoreScore = document.querySelector("#highScoreScore");
var button = document.getElementsByClassName("button"); 
var result = document.querySelector("#result");
var lastResult = document.querySelector("#lastResult");

var timeLeft ;
var score ;
var timeInterval ;
var correct ;
var currentIndexQuestion ;



// startQuiz function to hide the startPage, begin a timer, and present the quiz questions.
function startQuiz(){
    startPage.style.display = "none";
    quizPage.style.display = "flex";
    currentIndexQuestion = 0;
    score = 0;
    timeLeft = 75;
    renderQuestion();

    timeInterval = setInterval (function(){
        timeLeft--;
        timer.textContent = "Time left: " + timeLeft;

        if(timeLeft === 0){
            clearInterval(timeInterval);
            showScore();
        }
    }, 1000);
}

// Begin quiz when startButton is clicked.
startbutton.addEventListener("click", startQuiz);


// Object with quiz questions
var quizQuestions = [ {
    question: "Commonly used data types DO Not Include:",
    choiceA: "A. Strings",
    choiceB: "B. Booleans",
    choiceC: "C. Alerts",
    choiceD: "D. Numbers",
    correctAnswer: "c"},
{
    question: "The condition in an if/else statement is enclosed with _______.",
    choiceA: "A. Quotes",
    choiceB: "B. Curly brackets",
    choiceC: "C. Paranthesis",
    choiceD: "D. Square brackets",
    correctAnswer: "c"},
{
    question: "Arrays in JavaScript can be used to store _______.",
    choiceA: "A. Numbers and strings",
    choiceB: "B. Other arrays",
    choiceC: "C. Booleans",
    choiceD: "D. All of the above",
    correctAnswer: "d"},
{
    question: "String values must be enclosed within _______ when being assigned to variables.",
    choiceA: "A. Commas",
    choiceB: "B. Curly brackets",
    choiceC: "C. Quotes",
    choiceD: "D. Paranthesis",
    correctAnswer: "c"},
{
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choiceA: "A. JavaScript",
    choiceB: "B. Terminal/bash",
    choiceC: "C. For loops",
    choiceD: "D. Console.log",
    correctAnswer: "d"},
]


function renderQuestion (){
    var q = quizQuestions[currentIndexQuestion];
    question.textContent = q.question;
    choiceA.textContent = q.choiceA;
    choiceB.textContent = q.choiceB;
    choiceC.textContent = q.choiceC;
    choiceD.textContent = q.choiceD;

    if(currentIndexQuestion == 4){

        for(i = 0; i < button.length; i++){
            var btn = button[i];
            btn.addEventListener("click", showScore)
        }

        // The for loop is interchangeable with:
        // [...button].forEach(function(btn){
        //     btn.addEventListener("click", showScore)
        // })

    } else{
    
        for(i = 0; i < button.length; i++){
            var btn = button[i];
            btn.addEventListener("click", renderQuestion)
        }
    }
}

// This function is called through html
function checkAnswer(answer){

    if(answer == quizQuestions[currentIndexQuestion].correctAnswer){
        correct();
    }else{
        timeLeft -= 10;
        wrong();
    }

    currentIndexQuestion++;
}

function correct(){

    if (result != ''){
        result.textContent = '';
    }

    result.style.display = "flex";
    var correctOrWrong = document.createElement("div");  
    correctOrWrong.textContent = "Correct!" 

    if (currentIndexQuestion == 4){
        lastResult.appendChild(correctOrWrong); 
    }else{
        result.appendChild(correctOrWrong); 
    }
}

function wrong(){

    if (result != ''){
        result.textContent = '';
    }

    result.style.display = "flex";
    var correctOrWrong = document.createElement("div");  
    correctOrWrong.textContent = "Wrong!" 

    if (currentIndexQuestion == 4){
        lastResult.appendChild(correctOrWrong); 
    }else{
        result.appendChild(correctOrWrong); 
    }
}


// function to present score
function showScore(){
    quizPage.style.display = "none";
    scorePage.style.display = "flex";
    clearInterval(timeInterval);
    score = timeLeft;
    finalScore.textContent = "Your final score is " + score + ".";
    submitButton.addEventListener("click", highScore)
}


function highScore(){
    
    if(inputIntitials.value === "") {
        window.alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = inputIntitials.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        scorePage.style.display = "none";
        highScorePage.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighScores();
    }
    goBackButton.addEventListener("click", backToStartPage)
    clearButton.addEventListener("click", clearScores)
};


function generateHighScores(){
    highScoreInitials.textContent = "";
    highScoreScore.textContent = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++){
        var newName = document.createElement("li");
        var newScore = document.createElement("li");
        newName.textContent = highscores[i].name;
        newScore.textContent = highscores[i].score;
        highScoreInitials.appendChild(newName);
        highScoreScore.appendChild(newScore);
    }
}


function clearScores(){
    window.localStorage.clear();
    highScoreInitials.textContent = "";
    highScoreScore.textContent = "";
}


function backToStartPage(){
    location.reload();
}   


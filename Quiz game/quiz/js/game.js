const question = document.getElementById("question");
const aud = document.getElementById("audio");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];

let quest = {
    constructor: function (q) {
        this.q = q;
        return this;
    }
};

let person;

//get data from json file
fetch("questions.json")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        console.log(loadedQuestions);
        questions = loadedQuestions;
        startGame();
    })
    .catch(err => {
        console.error(err);
    });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

//generation new question
getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    person = Object.create(quest).constructor(currentQuestion.question);
    console.log(person);
    question.innerText = person.q;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

//check answer and + point for correct question
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers)
            return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        //pause a continue main game music and play 2 version correct and incorrect answer
        audio = () => {
            const soundExplosion = new Audio();
            aud.pause();
            if(classToApply === "correct") {
                soundExplosion.src = "media/correct.mp3";
                soundExplosion.play();
            }
            if(classToApply === "incorrect") {
                const soundExplosion = new Audio();
                soundExplosion.src = "media/incorrect.mp3";
                soundExplosion.play();
            }
            window.setTimeout(function () {
                aud.currentTime = 0;
                aud.play();
            }, 1500);
        };

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });

    //sum all score
     incrementScore = num => {
        score += num;
        scoreText.innerText = score;
    };
});
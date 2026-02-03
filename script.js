const questions = [
    {
        question: "Quel est le plus grand continent du monde ?",
        answers: ["Afrique", "Europe", "Asie", "Amérique"],
        correct: 2
    },
    {
        question: "Quel est le plus long fleuve du monde ?",
        answers: ["Nil", "Amazon", "Mississippi", "Congo"],
        correct: 0
    },
    {
        question: "Quelle est la capitale du Japon ?",
        answers: ["Séoul", "Pékin", "Tokyo", "Bangkok"],
        correct: 2
    },
    {
        question: "Combien y a-t-il de continents sur Terre ?",
        answers: ["5", "6", "7", "8"],
        correct: 2
    },
    {
        question: "Quel pays est le plus peuplé du monde ?",
        answers: ["États-Unis", "Inde", "Chine", "Russie"],
        correct: 2
    },
    {
        question: "Quel océan est le plus vaste ?",
        answers: ["Atlantique", "Indien", "Arctique", "Pacifique"],
        correct: 3
    }
];

let index = 0;
let score = 0;
let time = 10;
let timer;

// éléments HTML
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const quizEl = document.getElementById("quiz");
const endEl = document.getElementById("end");
const finalScoreEl = document.getElementById("finalScore");

// sons
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const endSound = document.getElementById("endSound");

function startTimer() {
    time = 10;
    timeEl.textContent = time;

    timer = setInterval(() => {
        time--;
        timeEl.textContent = time;

        if (time === 0) {
            clearInterval(timer);
            wrongSound.play();
            nextQuestion();
        }
    }, 1000);
}

function showQuestion() {
    const q = questions[index];
    questionEl.textContent = q.question;
    answersEl.innerHTML = "";

    q.answers.forEach((ans, i) => {
        const btn = document.createElement("button");
        btn.textContent = ans;
        btn.onclick = () => checkAnswer(i);
        answersEl.appendChild(btn);
    });

    startTimer();
}

function checkAnswer(i) {
    clearInterval(timer);

    if (i === questions[index].correct) {
        score++;
        scoreEl.textContent = score;
        correctSound.play();
    } else {
        wrongSound.play();
    }

    nextQuestion();
}

function nextQuestion() {
    index++;
    if (index < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    quizEl.classList.add("hidden");
    endEl.classList.remove("hidden");
    endSound.play();
    finalScoreEl.textContent = `🏆 Ton score final : ${score} / ${questions.length}`;
}

function restart() {
    index = 0;
    score = 0;
    scoreEl.textContent = score;
    quizEl.classList.remove("hidden");
    endEl.classList.add("hidden");
    showQuestion();
}

// démarrage
showQuestion();

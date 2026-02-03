
const questions = [
    {
        question: "Quelle est la capitale politique de la Côte d’Ivoire ?",
        answers: ["Abidjan", "Bouaké", "Yamoussoukro", "Daloa"],
        correct: 2
    },
    {
        question: "Quelle est la capitale économique de la Côte d’Ivoire ?",
        answers: ["Yamoussoukro", "San Pedro", "Korhogo", "Abidjan"],
        correct: 3
    },
    {
        question: "Quel est le fleuve le plus long de la Côte d’Ivoire ?",
        answers: ["Comoé", "Bandama", "Sassandra", "Cavally"],
        correct: 1
    },
    {
        question: "Combien de districts compte la Côte d’Ivoire ?",
        answers: ["10", "12", "14", "16"],
        correct: 2
    },
    {
        question: "Quelle est la monnaie utilisée en Côte d’Ivoire ?",
        answers: ["Naira", "Franc CFA", "Cedi", "Euro"],
        correct: 1
    },
    {
        question: "Quel pays ne partage PAS de frontière avec la Côte d’Ivoire ?",
        answers: ["Ghana", "Mali", "Guinée", "Nigeria"],
        correct: 3
    },
    {
        question: "Quel est le principal produit d’exportation ivoirien ?",
        answers: ["Café", "Cacao", "Riz", "Coton"],
        correct: 1
    },
    {
        question: "Quel est le plat traditionnel ivoirien ?",
        answers: ["Thiéboudienne", "Attiéké", "Couscous", "Foutou"],
        correct: 1
    },
    {
        question: "Quelle langue est officielle en Côte d’Ivoire ?",
        answers: ["Dioula", "Baoulé", "Bété", "Français"],
        correct: 3
    },
    {
        question: "Quel océan borde la Côte d’Ivoire ?",
        answers: ["Océan Atlantique", "Océan Indien", "Mer Rouge", "Mer Méditerranée"],
        correct: 0
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
const goodSound = document.getElementById("goodSound");
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
        goodSound.play(); // 🎵 son doux "bien joué"
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
    finalScoreEl.textContent =
        `🏆 Ton score : ${score} / ${questions.length}`;
}

function restart() {
    index = 0;
    score = 0;
    scoreEl.textContent = score;
    quizEl.classList.remove("hidden");
    endEl.classList.add("hidden");
    showQuestion();
}

showQuestion();


// Dados do Quiz com base nos slides[cite: 2]
const questions = [
    {
        question: "Quem foi Archimedes Belia no Colégio Estadual Carlos Gomes?",
        answers: [
            { text: "Um professor de história que também foi diretor escolar", correct: true },
            { text: "Um aluno do 1º ano do ensino médio", correct: false },
            { text: "O fundador da cidade de São João do Caiuá", correct: false },
            { text: "Um inspetor de alunos", correct: false }
        ],
        explanation: "Archimedes Belia foi um influente professor de história, foi diretor em 1979 e trabalhou na biblioteca[cite: 2]."
    },
    {
        question: "Qual era uma das frases famosas costumava dizer o professor Belia?",
        answers: [
            { text: "A história não tem importância", correct: false },
            { text: "A história tem dois lados e para conhecer o mundo devemos conhecer história", correct: true },
            { text: "Os livros didáticos nunca erram", correct: false },
            { text: "A história só existe no papel", correct: false }
        ],
        explanation: "Ele amava lecionar história e dizia que ela possui dois lados e nos ajuda a conhecer o mundo[cite: 2]."
    },
    {
        question: "Em qual pavilhão fica localizada a biblioteca da escola e quem auxilia os alunos?",
        answers: [
            { text: "1º pavilhão / Funcionária Maria", correct: false },
            { text: "3º pavilhão / Dona Odilhia", correct: false },
            { text: "5º pavilhão / Funcionária Cida", correct: true },
            { text: "2º pavilhão / Professor Belia", correct: false }
        ],
        explanation: "A biblioteca do Carlos Gomes fica no 5º pavilhão e conta com a funcionária Cida para auxiliar[cite: 2]."
    },
    {
        question: "Em que ano a biblioteca recebeu o nome de Professor Archimedes Belia?",
        answers: [
            { text: "1979", correct: false },
            { text: "2012", correct: true },
            { text: "2014", correct: false },
            { text: "1960", correct: false }
        ],
        explanation: "A escolha do nome ocorreu após uma consulta feita em 2012 com professores e funcionários[cite: 2]."
    },
    {
        question: "Por que a casa do professor Belia era considerada uma 'biblioteca'? ",
        answers: [
            { text: "Porque ele vendia livros na porta de casa", correct: false },
            { text: "Porque tinha coleções de enciclopédias como Barsa e Conhecer", correct: true },
            { text: "Porque a prefeitura construiu uma biblioteca na casa dele", correct: false },
            { text: "Porque ele guardava apenas livros didáticos escolares", correct: false }
        ],
        explanation: "Sua casa possuía coleções famosas como Barsa e Conhecer, sendo ele considerado uma 'biblioteca ambulante'[cite: 2]."
    }
];

// Elementos HTML
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const nextBtn = document.getElementById('next-btn');

const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const feedbackContainer = document.getElementById('feedback-container');
const feedbackText = document.getElementById('feedback-text');
const progressText = document.getElementById('progress');
const scoreText = document.getElementById('score');
const finalScoreText = document.getElementById('final-score');

let currentQuestionIndex = 0;
let score = 0;

// Event Listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startScreen.classList.add('hide');
    endScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    scoreText.innerText = `Pontos: ${score}`;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionText.innerText = question.question;
    progressText.innerText = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'btn-option');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    feedbackContainer.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
        scoreText.innerText = `Pontos: ${score}`;
        feedbackText.innerText = "✨ Resposta Correta! " + questions[currentQuestionIndex].explanation;
    } else {
        selectedButton.classList.add('wrong');
        feedbackText.innerText = "❌ Resposta Incorreta! " + questions[currentQuestionIndex].explanation;
    }

    // Desabilita todos os botões após a escolha
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
    });

    feedbackContainer.classList.remove('hide');

    if (questions.length === currentQuestionIndex + 1) {
        nextBtn.innerText = "Ver Resultado";
        nextBtn.onclick = showEndScreen;
    } else {
        nextBtn.innerText = "Próxima Pergunta";
        nextBtn.onclick = () => {
            currentQuestionIndex++;
            setNextQuestion();
        };
    }
}

function showEndScreen() {
    quizScreen.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScoreText.innerText = `Você acertou ${score} de ${questions.length} perguntas sobre a Biblioteca!`;
}
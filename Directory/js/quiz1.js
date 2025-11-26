const question = [
    {
        question: "wich is larget animal in the world?",
        answers: [
            { text: "m", correct: false},
            { text: "p", correct: true},
            { text: "o", correct: false},
            { text: "i", correct: false},
        ]
    },
    {
      question: "wich is larget animal in the world?",
        answers: [
            { text: "z", correct: false},
            { text: "d", correct: true},
            { text: "t", correct: false},
            { text: "u", correct: false} ,
        ] 
    },
     {
      question: "wich is larget animal in the world?",
        answers: [
            { text: "z", correct: false},
            { text: "d", correct: true},
            { text: "t", correct: false},
            { text: "u", correct: false} ,
        ] 
    },
     {
      question: "wich is larget animal in the world?",
        answers: [
            { text: "z", correct: false},
            { text: "d", correct: true},
            { text: "t", correct: false},
            { text: "u", correct: false} ,
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion(); 
}

function showQuestion(){
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach (answer => {
        const button = Document.createElement("button");
        button.innerHTML = answer.text;
        button.classlist.add("btn");
        answerButton.appendChild(button);
        
    });
}


function resetState(){
    nextButton.style.display
}

startQuiz();
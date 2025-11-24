const questions = [
    {
        question: "wich is larget animal in the world?",
        answers: [
            { text: "Shark", correct: false}
            { text: "Shark", correct: true}
            { text: "Shark", correct: false}
            { text: "Shark", correct: false}
        ]
    },
    {
      question: "wich is larget animal in the world?",
        answers: [
            { text: "Shark", correct: false}
            { text: "Shark", correct: true}
            { text: "Shark", correct: false}
            { text: "Shark", correct: false} 
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
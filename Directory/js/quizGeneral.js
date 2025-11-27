const quizGeneralQuestions = [
    {
        question: "Qui a été le premier astronaute à voyager dans l'espace ?",
        answers: [
            { text: "Neil Armstrong", correct: false },
            { text: "Youri Alexeïevitch Gagarine", correct: true },
            { text: "Alan Shepard", correct: false },
            { text: "Valentina Tereshkova", correct: false },
        ]
    },
    {
        question: "En quelle année Gagarine a-t-il effectué son vol historique ?",
        answers: [
            { text: "1960", correct: false },
            { text: "1961", correct: true },
            { text: "1962", correct: false },
            { text: "1963", correct: false },
        ]
    },
    {
        question: "Qui a été la première femme dans l'espace ?",
        answers: [
            { text: "Sally Ride", correct: false },
            { text: "Svetlana Savitskaya", correct: false },
            { text: "Valentina Tereshkova", correct: true },
            { text: "Kalpana Chawla", correct: false },
        ]
    },
    {
        question: "Quel astronaute a été le premier homme à marcher sur la Lune ?",
        answers: [
            { text: "Buzz Aldrin", correct: false },
            { text: "Neil Armstrong", correct: true },
            { text: "Pete Conrad", correct: false },
            { text: "Alan Bean", correct: false },
        ]
    },
    {
        question: "En quelle année l'homme a-t-il marché sur la Lune pour la première fois ?",
        answers: [
            { text: "1966", correct: false },
            { text: "1968", correct: false },
            { text: "1969", correct: true },
            { text: "1970", correct: false },
        ]
    },
    {
        question: "Quelle a été la première fusée à atteindre l'orbite terrestre ?",
        answers: [
            { text: "Saturn V", correct: false },
            { text: "Semiorka (R-7)", correct: true },
            { text: "Ariane 5", correct: false },
            { text: "Falcon 9", correct: false },
        ]
    },
    {
        question: "Combien de fois Apollo 11 a-t-elle orbitée autour de la Lune ?",
        answers: [
            { text: "50 fois", correct: false },
            { text: "75 fois", correct: true },
            { text: "100 fois", correct: false },
            { text: "125 fois", correct: false },
        ]
    },
    {
        question: "Quel pays a lancé le premier satellite artificiel ?",
        answers: [
            { text: "États-Unis", correct: false },
            { text: "Union Soviétique", correct: true },
            { text: "France", correct: false },
            { text: "Japon", correct: false },
        ]
    },
    {
        question: "Quel était le nom du premier satellite artificiel ?",
        answers: [
            { text: "Vostok 1", correct: false },
            { text: "Spoutnik 1", correct: true },
            { text: "Mir", correct: false },
            { text: "Luna 1", correct: false },
        ]
    },
    {
        question: "En quelle année le premier satellite a-t-il été lancé ?",
        answers: [
            { text: "1955", correct: false },
            { text: "1956", correct: false },
            { text: "1957", correct: true },
            { text: "1958", correct: false },
        ]
    },
    {
        question: "Quel programme spatial américain a mené à la Lune ?",
        answers: [
            { text: "Mercury", correct: false },
            { text: "Gemini", correct: false },
            { text: "Apollo", correct: true },
            { text: "Skylab", correct: false },
        ]
    },
    {
        question: "Combien d'astronautes ont marché sur la Lune ?",
        answers: [
            { text: "10", correct: false },
            { text: "12", correct: true },
            { text: "15", correct: false },
            { text: "20", correct: false },
        ]
    }
];

// Initialiser le quiz
document.addEventListener("DOMContentLoaded", () => {
    new Quiz(quizGeneralQuestions);
});

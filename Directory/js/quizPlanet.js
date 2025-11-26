const quizPlanetQuestions = [
    {
        question: "Quel est le plus grand objet du système solaire ?",
        answers: [
            { text: "Jupiter", correct: false },
            { text: "Le Soleil", correct: true },
            { text: "Saturne", correct: false },
            { text: "Neptune", correct: false },
        ]
    },
    {
        question: "Combien de planètes constituent le système solaire ?",
        answers: [
            { text: "8", correct: true },
            { text: "9", correct: false },
            { text: "10", correct: false },
            { text: "11", correct: false },
        ]
    },
    {
        question: "Quelle est la planète la plus proche du Soleil ?",
        answers: [
            { text: "Vénus", correct: false },
            { text: "Mercure", correct: true },
            { text: "La Terre", correct: false },
            { text: "Mars", correct: false },
        ]
    },
    {
        question: "Combien de lunes la Terre possède-t-elle ?",
        answers: [
            { text: "2", correct: false },
            { text: "1", correct: true },
            { text: "3", correct: false },
            { text: "0", correct: false },
        ]
    },
    {
        question: "Quelle planète est connue pour ses anneaux visibles ?",
        answers: [
            { text: "Jupiter", correct: false },
            { text: "Saturne", correct: true },
            { text: "Uranus", correct: false },
            { text: "Neptune", correct: false },
        ]
    },
    {
        question: "Combien de lunes Mars possède-t-elle ?",
        answers: [
            { text: "1", correct: false },
            { text: "2", correct: true },
            { text: "3", correct: false },
            { text: "0", correct: false },
        ]
    },
    {
        question: "Quel est le diamètre approximatif du Soleil ?",
        answers: [
            { text: "700 000 km", correct: false },
            { text: "1,39 million de km", correct: true },
            { text: "2 millions de km", correct: false },
            { text: "500 000 km", correct: false },
        ]
    },
    {
        question: "Quelle est la température à la surface du Soleil ?",
        answers: [
            { text: "3000°C", correct: false },
            { text: "5500°C", correct: true },
            { text: "8000°C", correct: false },
            { text: "10000°C", correct: false },
        ]
    },
    {
        question: "Quel est le diamètre approximatif de Jupiter ?",
        answers: [
            { text: "50 000 km", correct: false },
            { text: "88 000 km", correct: false },
            { text: "139 000 km", correct: true },
            { text: "200 000 km", correct: false },
        ]
    },
    {
        question: "Combien de lunes Jupiter possède-t-elle ?",
        answers: [
            { text: "16", correct: false },
            { text: "48", correct: false },
            { text: "95 ou plus", correct: true },
            { text: "12", correct: false },
        ]
    },
    {
        question: "Quel est le diamètre approximatif de la Terre ?",
        answers: [
            { text: "6 371 km", correct: false },
            { text: "12 742 km", correct: true },
            { text: "10 000 km", correct: false },
            { text: "15 000 km", correct: false },
        ]
    },
    {
        question: "Quelle est la distance moyenne Terre-Soleil ?",
        answers: [
            { text: "100 millions de km", correct: false },
            { text: "150 millions de km", correct: true },
            { text: "200 millions de km", correct: false },
            { text: "50 millions de km", correct: false },
        ]
    }
];

// Initialiser le quiz
document.addEventListener("DOMContentLoaded", () => {
    new Quiz(quizPlanetQuestions);
});

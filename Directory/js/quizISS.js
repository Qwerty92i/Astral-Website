const quizISSQuestions = [
    {
        question: "Qu'est-ce que l'ISS ?",
        answers: [
            { text: "Une sonde spatiale", correct: false },
            { text: "La Station spatiale internationale", correct: true },
            { text: "Un satellite de communication", correct: false },
            { text: "Un astéroïde habité", correct: false },
        ]
    },
    {
        question: "À quelle altitude orbitale se trouve l'ISS ?",
        answers: [
            { text: "Environ 200 km", correct: false },
            { text: "Environ 400 km", correct: true },
            { text: "Environ 600 km", correct: false },
            { text: "Environ 800 km", correct: false },
        ]
    },
    {
        question: "En quelle année le premier module de l'ISS a-t-il été lancé ?",
        answers: [
            { text: "1998", correct: true },
            { text: "2000", correct: false },
            { text: "1995", correct: false },
            { text: "2002", correct: false },
        ]
    },
    {
        question: "Combien de temps l'ISS met-elle pour faire le tour de la Terre ?",
        answers: [
            { text: "Environ 45 minutes", correct: false },
            { text: "Environ 90 minutes", correct: true },
            { text: "Environ 2 heures", correct: false },
            { text: "Environ 3 heures", correct: false },
        ]
    },
    {
        question: "Quel est le principal objectif scientifique de l'ISS ?",
        answers: [
            { text: "Tourisme spatial", correct: false },
            { text: "Réaliser des expériences scientifiques en microgravité", correct: true },
            { text: "Surveillance météorologique", correct: false },
            { text: "Télécommunications", correct: false },
        ]
    },
    {
        question: "Combien d'astronautes peuvent vivre simultanément sur l'ISS ?",
        answers: [
            { text: "3 à 4", correct: false },
            { text: "5 à 7", correct: true },
            { text: "8 à 10", correct: false },
            { text: "Plus de 10", correct: false },
        ]
    },
    {
        question: "Quel pays a envoyé le premier élément de l'ISS en orbite ?",
        answers: [
            { text: "États-Unis", correct: false },
            { text: "Union Soviétique/Russie", correct: true },
            { text: "Europe", correct: false },
            { text: "Japon", correct: false },
        ]
    },
    {
        question: "Combien de pays participent à la construction et l'exploitation de l'ISS ?",
        answers: [
            { text: "5", correct: false },
            { text: "8", correct: false },
            { text: "15", correct: true },
            { text: "20", correct: false },
        ]
    },
    {
        question: "Quel est le poids approximatif de l'ISS ?",
        answers: [
            { text: "200 tonnes", correct: false },
            { text: "420 tonnes", correct: true },
            { text: "600 tonnes", correct: false },
            { text: "800 tonnes", correct: false },
        ]
    },
    {
        question: "À quelle vitesse l'ISS se déplace-t-elle ?",
        answers: [
            { text: "Environ 17 km/s", correct: true },
            { text: "Environ 10 km/s", correct: false },
            { text: "Environ 25 km/s", correct: false },
            { text: "Environ 30 km/s", correct: false },
        ]
    },
    {
        question: "Quel est la dimension approximative de l'ISS ?",
        answers: [
            { text: "50m × 50m", correct: false },
            { text: "100m × 70m", correct: true },
            { text: "150m × 100m", correct: false },
            { text: "200m × 150m", correct: false },
        ]
    },
    {
        question: "Combien de panneaux solaires l'ISS possède-t-elle ?",
        answers: [
            { text: "4 paires", correct: false },
            { text: "8 paires", correct: true },
            { text: "12 paires", correct: false },
            { text: "16 paires", correct: false },
        ]
    }
];

document.addEventListener("DOMContentLoaded", () => {
    new Quiz(quizISSQuestions);
});

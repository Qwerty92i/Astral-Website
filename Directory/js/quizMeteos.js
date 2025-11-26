// Questions optimisées pour le Quiz Météores & Astéroïdes
const quizMeteosQuestions = [
    {
        question: "Qu'est-ce qu'un météore ?",
        answers: [
            { text: "Un objet en orbite stable autour du Soleil", correct: false },
            { text: "Un météoroïde qui entre dans l'atmosphère terrestre et brûle", correct: true },
            { text: "Une pierre qui a survécu à l'impact", correct: false },
            { text: "Un type de satellite", correct: false },
        ]
    },
    {
        question: "Qu'est-ce qu'une météorite ?",
        answers: [
            { text: "Un météoroïde en orbite", correct: false },
            { text: "Un météore visible depuis la Terre", correct: false },
            { text: "Un objet qui a survécu à la traversée de l'atmosphère", correct: true },
            { text: "Un type de comète", correct: false },
        ]
    },
    {
        question: "D'où proviennent la plupart des météoroïdes ?",
        answers: [
            { text: "De Mars", correct: false },
            { text: "De la ceinture d'astéroïdes entre Mars et Jupiter", correct: true },
            { text: "De comètes", correct: false },
            { text: "De la Lune", correct: false },
        ]
    },
    {
        question: "Quelle est la principale différence entre un astéroïde et une comète ?",
        answers: [
            { text: "La taille uniquement", correct: false },
            { text: "Les comètes contiennent de la glace, les astéroïdes sont rocheux", correct: true },
            { text: "Les comètes orbitent le Soleil, pas les astéroïdes", correct: false },
            { text: "Les astéroïdes peuvent avoir des queues", correct: false },
        ]
    },
    {
        question: "Combien d'astéroïdes la NASA surveille-t-elle régulièrement ?",
        answers: [
            { text: "Moins de 1000", correct: false },
            { text: "Environ 10 000", correct: false },
            { text: "Plus de 25 000", correct: true },
            { text: "Plus de 50 000", correct: false },
        ]
    },
    {
        question: "Quel est le plus grand astéroïde du système solaire ?",
        answers: [
            { text: "Vesta", correct: false },
            { text: "Cérès", correct: true },
            { text: "Pallas", correct: false },
            { text: "Junon", correct: false },
        ]
    },
    {
        question: "À quelle vitesse les météores entrent-ils dans l'atmosphère ?",
        answers: [
            { text: "5 km/s", correct: false },
            { text: "15 km/s", correct: false },
            { text: "Plus de 20 km/s", correct: true },
            { text: "2 km/s", correct: false },
        ]
    },
    {
        question: "Quel événement météorique spectaculaire survient chaque année ?",
        answers: [
            { text: "Les Perséides", correct: true },
            { text: "L'Éclipse solaire", correct: false },
            { text: "Le transit de Vénus", correct: false },
            { text: "L'opposition de Mars", correct: false },
        ]
    },
    {
        question: "À quelle altitude brûlent généralement les météores ?",
        answers: [
            { text: "10-20 km", correct: false },
            { text: "50-100 km", correct: true },
            { text: "150-200 km", correct: false },
            { text: "300+ km", correct: false },
        ]
    },
    {
        question: "Quel astéroïde a causé l'extinction des dinosaures ?",
        answers: [
            { text: "Apophis", correct: false },
            { text: "Chicxulub", correct: true },
            { text: "Bennu", correct: false },
            { text: "Ryugu", correct: false },
        ]
    },
    {
        question: "Combien de pluies météoriques majeures se produisent par an ?",
        answers: [
            { text: "3-4", correct: false },
            { text: "6-8", correct: false },
            { text: "10-12", correct: true },
            { text: "Plus de 20", correct: false },
        ]
    },
    {
        question: "Quel astéroïde proche de la Terre est régulièrement surveillé par la NASA ?",
        answers: [
            { text: "Bennu", correct: true },
            { text: "Cérès", correct: false },
            { text: "Vesta", correct: false },
            { text: "Pallas", correct: false },
        ]
    }
];

// Initialiser le quiz
document.addEventListener("DOMContentLoaded", () => {
    new Quiz(quizMeteosQuestions);
});

const quizDailyAstreQuestions = [
    {
        question: "Quel est l'objet le plus photographié par les télescopes spatiaux ?",
        answers: [
            { text: "Le Soleil", correct: false },
            { text: "La Lune", correct: false },
            { text: "Les galaxies lointaines", correct: true },
            { text: "Vénus", correct: false },
        ]
    },
    {
        question: "À quelle fréquence la NASA publie-t-elle une image astronomique du jour ?",
        answers: [
            { text: "Une par semaine", correct: false },
            { text: "Une par jour", correct: true },
            { text: "Une par mois", correct: false },
            { text: "Une par an", correct: false },
        ]
    },
    {
        question: "Quel est le télescope spatial qui a fourni les images les plus détaillées ?",
        answers: [
            { text: "Spitzer", correct: false },
            { text: "Hubble", correct: true },
            { text: "WISE", correct: false },
            { text: "Kepler", correct: false },
        ]
    },
    {
        question: "Combien de temps la lumière du Soleil met-elle pour nous atteindre ?",
        answers: [
            { text: "Environ 5 minutes", correct: false },
            { text: "Environ 8 minutes", correct: true },
            { text: "Environ 12 minutes", correct: false },
            { text: "Environ 24 heures", correct: false },
        ]
    },
    {
        question: "Quelle est la plus proche étoile du Soleil (hors du Soleil) ?",
        answers: [
            { text: "Sirius", correct: false },
            { text: "Proxima Centauri", correct: true },
            { text: "Véga", correct: false },
            { text: "Altaïr", correct: false },
        ]
    },
    {
        question: "Quel est le cycle principal d'activité du Soleil ?",
        answers: [
            { text: "5 ans", correct: false },
            { text: "11 ans", correct: true },
            { text: "15 ans", correct: false },
            { text: "20 ans", correct: false },
        ]
    },
    {
        question: "À quelle distance se trouve Proxima Centauri du Soleil ?",
        answers: [
            { text: "2 années-lumière", correct: false },
            { text: "4,24 années-lumière", correct: true },
            { text: "10 années-lumière", correct: false },
            { text: "15 années-lumière", correct: false },
        ]
    },
    {
        question: "Quel télescope spatial a succédé à Hubble pour observer l'univers lointain ?",
        answers: [
            { text: "Chandra", correct: false },
            { text: "James Webb", correct: true },
            { text: "Spitzer", correct: false },
            { text: "WISE", correct: false },
        ]
    },
    {
        question: "Combien d'étoiles estimées existe-t-il dans l'univers observable ?",
        answers: [
            { text: "Millions", correct: false },
            { text: "Milliards", correct: false },
            { text: "Milliards de milliards", correct: true },
            { text: "Trillions", correct: false },
        ]
    },
    {
        question: "Quel est le nom de notre galaxie ?",
        answers: [
            { text: "Andromède", correct: false },
            { text: "La Voie Lactée", correct: true },
            { text: "Whirlpool", correct: false },
            { text: "Sombrero", correct: false },
        ]
    },
    {
        question: "Combien de milliards d'étoiles la Voie Lactée contient-elle ?",
        answers: [
            { text: "50 à 100 milliards", correct: false },
            { text: "100 à 400 milliards", correct: true },
            { text: "500 à 700 milliards", correct: false },
            { text: "Plus d'un trillion", correct: false },
        ]
    },
    {
        question: "Quelle est la constellation la plus brillante du ciel nocturne ?",
        answers: [
            { text: "Orion", correct: false },
            { text: "Grande Ourse", correct: false },
            { text: "Croix du Sud", correct: false },
            { text: "Sirius (en Canis Major)", correct: true },
        ]
    }
];

document.addEventListener("DOMContentLoaded", () => {
    new Quiz(quizDailyAstreQuestions);
});

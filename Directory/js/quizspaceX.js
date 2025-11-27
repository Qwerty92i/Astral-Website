const quizSpaceXQuestions = [
    {
        question: "En quelle année SpaceX a-t-elle été fondée ?",
        answers: [
            { text: "2000", correct: false },
            { text: "2002", correct: true },
            { text: "2005", correct: false },
            { text: "2008", correct: false },
        ]
    },
    {
        question: "Qui est le fondateur et PDG de SpaceX ?",
        answers: [
            { text: "Jeff Bezos", correct: false },
            { text: "Elon Musk", correct: true },
            { text: "Richard Branson", correct: false },
            { text: "Robert Goddard", correct: false },
        ]
    },
    {
        question: "Quel est le nom du vaisseau spatial réutilisable de SpaceX ?",
        answers: [
            { text: "Dragon", correct: false },
            { text: "Starship", correct: true },
            { text: "Falcon", correct: false },
            { text: "Crew", correct: false },
        ]
    },
    {
        question: "Quel a été le premier succès majeur de SpaceX ?",
        answers: [
            { text: "Lancement du Falcon 1", correct: false },
            { text: "Récupération du premier étage du Falcon 9", correct: true },
            { text: "Lancement du Falcon Heavy", correct: false },
            { text: "Premiers vols habités avec Dragon", correct: false },
        ]
    },
    {
        question: "À quoi sert la fusée Falcon Heavy de SpaceX ?",
        answers: [
            { text: "Vols spatiaux touristiques", correct: false },
            { text: "Lancements de charges lourdes vers l'orbite et au-delà", correct: true },
            { text: "Ravitaillement de l'ISS exclusivement", correct: false },
            { text: "Expériences scientifiques en microgravité", correct: false },
        ]
    },
    {
        question: "Quel est le principal vaisseau utilisé par SpaceX pour approvisionner l'ISS ?",
        answers: [
            { text: "Falcon 9", correct: false },
            { text: "Dragon Cargo", correct: true },
            { text: "Starship", correct: false },
            { text: "Falcon Heavy", correct: false },
        ]
    },
    {
        question: "En quelle année SpaceX a-t-elle lancé le premier vol habité avec Crew Dragon ?",
        answers: [
            { text: "2018", correct: false },
            { text: "2019", correct: false },
            { text: "2020", correct: true },
            { text: "2021", correct: false },
        ]
    },
    {
        question: "Quel est le premier étage du Falcon Heavy qui a été réutilisé au succès ?",
        answers: [
            { text: "Core 0", correct: false },
            { text: "Booster 1", correct: true },
            { text: "Center Core", correct: false },
            { text: "Side Booster", correct: false },
        ]
    },
    {
        question: "Combien de moteurs Raptor le Starship devrait-il avoir ?",
        answers: [
            { text: "30", correct: false },
            { text: "33", correct: true },
            { text: "50", correct: false },
            { text: "60", correct: false },
        ]
    },
    {
        question: "Quel est l'objectif principal du projet Starship ?",
        answers: [
            { text: "Tourisme spatial uniquement", correct: false },
            { text: "Aller sur Mars et devenir réutilisable", correct: true },
            { text: "Remplacer le Falcon 9", correct: false },
            { text: "Missions autour de la Lune seulement", correct: false },
        ]
    },
    {
        question: "Quelle hauteur devrait atteindre le Starship complet ?",
        answers: [
            { text: "80 mètres", correct: false },
            { text: "120 mètres", correct: true },
            { text: "150 mètres", correct: false },
            { text: "200 mètres", correct: false },
        ]
    },
    {
        question: "Quel est le principal marché commercial de SpaceX ?",
        answers: [
            { text: "Tourisme spatial", correct: false },
            { text: "Lancement de satellites en orbite basse", correct: true },
            { text: "Exploration minière d'astéroïdes", correct: false },
            { text: "Ravitaillement de stations spatiales uniquement", correct: false },
        ]
    }
];

// Initialiser le quiz
document.addEventListener("DOMContentLoaded", () => {
    new Quiz(quizSpaceXQuestions);
});

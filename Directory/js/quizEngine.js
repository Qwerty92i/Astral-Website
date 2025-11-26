// Logique commune pour tous les quiz
class Quiz {
    constructor(questionsData) {
        this.questions = questionsData;
        this.questionElement = document.getElementById("question");
        this.answerButtons = document.getElementById("answer-buttons");
        this.nextButton = document.getElementById("next-btn");
        this.currentQuestionIndex = 0;
        this.score = 0;

        this.nextButton.addEventListener("click", () => this.handleNextButton());
        this.startQuiz();
    }

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.nextButton.innerHTML = "Suivant";
        this.showQuestion();
    }

    showQuestion() {
        this.resetState();
        const currentQuestion = this.questions[this.currentQuestionIndex];
        const questionNo = this.currentQuestionIndex + 1;
        this.questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

        // Génération des boutons de réponses
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            if (answer.correct) {
                button.dataset.correct = "true";
            }
            button.addEventListener("click", (e) => this.selectAnswer(e));
            this.answerButtons.appendChild(button);
        });
    }

    resetState() {
        this.nextButton.style.display = "none";
        while (this.answerButtons.firstChild) {
            this.answerButtons.removeChild(this.answerButtons.firstChild);
        }
    }

    selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        if (isCorrect) {
            selectedBtn.classList.add("correct");
            this.score++;
        } else {
            selectedBtn.classList.add("incorrect");
        }

        // Désactiver tous les boutons et montrer la bonne réponse
        Array.from(this.answerButtons.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
            button.disabled = true;
        });

        this.nextButton.style.display = "block";
    }

    showScore() {
        this.resetState();
        this.questionElement.innerHTML = `🎉 Ton score : ${this.score} / ${this.questions.length}`;
        this.nextButton.innerHTML = "Rejouer";
        this.nextButton.style.display = "block";
    }

    handleNextButton() {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
            this.showQuestion();
        } else {
            this.showScore();
            // Si on rejoue, réinitialiser
            if (this.nextButton.innerHTML === "Rejouer") {
                this.nextButton.addEventListener("click", () => {
                    this.startQuiz();
                });
            }
        }
    }
}

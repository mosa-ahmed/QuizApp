import { Question } from "./question.js";

export class Quiz{
    constructor(category, difficulty, numberOfQuestions){
        this.category = category;
        this.difficulty = difficulty;
        this.numberOfQuestions = numberOfQuestions;
        this.score = 0;
    }

    async getQuestion(){
        const res = await fetch(`https://opentdb.com/api.php?amount=${this.numberOfQuestions}&category=${this.category}&difficulty=${this.difficulty}&type=multiple`)
        const data = await res.json()
        return data.results
    }

    endQuiz(){
        return `<div class="question bg-white shadow-lg col-lg-6 offset-lg-3 p-4 rounded-3 d-flex flex-column justify-content-center align-items-center animate__animated animate__zoomIn">
                    <h2 class="mb-2">
                        ${this.score == this.numberOfQuestions? `Congratulations` : `Your score is ${this.score}`}
                    </h2>
                    <button class="again btn btn-primary rounded-pill">
                        <i class="fa fa-repeat"></i> Try Again
                    </button>
               </div>`
    }
}
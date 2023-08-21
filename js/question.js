import { questions , quiz, questionsContainer} from "./main.js";

export class Question{
    constructor(index){
        this.question = questions[index].question
        this.category = questions[index].category
        this.answer = questions[index].correct_answer
        this.answer = questions[index].correct_answer
        this.answer = questions[index].correct_answer
        this.wrongAnswers = questions[index].incorrect_answers
        this.index = index
        this.answered = false
        this.allAnswers = this.getchoicesReady()

    }

    getchoicesReady(){
        return this.wrongAnswers.concat(this.answer).sort()
    }

    displayQuestion(){
        const questionHTML = `<div class="question bg-white shadow-lg col-lg-6 offset-lg-3 p-4 rounded-3 d-flex flex-column justify-content-center align-items-center animate__animated animate__zoomIn">
        <div class="w-100 mb-2 d-flex justify-content-between">
            <span class="btn btn-category">${this.category}</span>
            <span class="fs-6 btn btn-questions">${this.index + 1} of ${questions.length} Questions</span>
        </div>
        <h2 class="text-capitalize h4 text-center">${this.question}</h2>
        <ul class="choices w-100 list-unstyled m-3 d-flex flex-wrap text-center">
            ${this.allAnswers.map(function(answer){
                return `<li>${answer}</li>`
            }).join("")}
        </ul>
        <h2 class="text-capitalize text-center score-color h3 fw-bold"><i class="fa fa-face-smile me-2"></i>Score: ${quiz.score}</h2>
        </div>`

        questionsContainer.innerHTML = questionHTML

        const allAnswers = document.querySelectorAll(".question ul li")
        for (let i = 0; i < allAnswers.length; i++) {
            allAnswers[i].addEventListener("click",(e) => {
                this.checkAnswer(e)
            })
        }
    }

    checkAnswer(e){
        if(!this.answered)
        {
            this.answered = true
            if(e.target.innerHTML.toLowerCase() == this.answer.toLowerCase()){
            e.target.classList.add("animate__animated","animate__flipInY","correct");
            quiz.score += 1
            document.querySelector(".score-color").innerHTML = `<i class="fa fa-face-smile me-2"></i>Score: ${quiz.score}`
        }else{
            e.target.classList.add("animate__animated","animate__shakeX","wrong")
        }

        this.animateQuestion(e.target,500)
        }
    }

    animateQuestion(element, duration){
        setTimeout(() => {
            element.closest(".question").classList.replace("animate__zoomIn","animate__backOutLeft")
            setTimeout(() => {
                this.nextQusetion()
            }, duration);
        },duration)
    }

    nextQusetion(){
        this.index += 1
        if(this.index > questions.length - 1){
            questionsContainer.innerHTML = quiz.endQuiz()
            const tryAgainBtn = document.querySelector(".again")
            tryAgainBtn.addEventListener("click",function(){
                window.location.reload()
            })
            return
        }
        const newQuestion = new Question(this.index)
        newQuestion.displayQuestion()
    }

   
}
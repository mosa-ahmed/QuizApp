import { Quiz } from "./quiz.js";
import { Question } from "./question.js";

const categoryMenu = document.getElementById("categoryMenu")
const difficultyOptions = document.getElementById("difficultyOptions")
const questionsNumber = document.getElementById("questionsNumber") 
const quizOptions = document.getElementById("quizOptions") 
export const questionsContainer = document.querySelector(".questions-container") 

const startBtn = document.getElementById("startQuiz")

export let questions
export let quiz


startBtn.addEventListener("click",async function(){
    const category = categoryMenu.value
    const difficulty = difficultyOptions.value
    const numbers = questionsNumber.value

    quiz = new Quiz(category, difficulty, numbers)
    questions = await quiz.getQuestion()
    const question = new Question(0)


    quizOptions.classList.replace("d-flex","d-none")
    question.displayQuestion()
    console.log(question);
    console.log(questions);
})


var score = 0
var startBtn = document.getElementById("start-btn")
var answerBtnContainer = document.getElementById("answer-btn-container")
var vhsBtn = document.getElementById("high-score-btn")
var question = document.getElementById("question")
var questionText = document.getElementById("question-text")
var nextBtn = document.getElementById("next-btn")
var scoreDisplayContainer = document.getElementById('score-display')

let shuffledQuestions, currentQuestionIndex

startBtn.addEventListener('click', start)
nextBtn.addEventListener('click', setNextQuestion)


var questions = [
    {
        title: "What language do you use to code the basic frame work of a website?",
        choices: ["Mandarin", "English", "Hyper Text Markup Language", "I Don't Know"],
        correct: "Hyper Text Markup Language"
    },
    {
        title: "What is 2 + 2?",
        choices: ["4", "13", "8", "I Don't Know"],
        correct: "4"
    },
    {
        title: "What is 2 * 2?",
        choices: ["4", "14", "8", "I Don't Know"],
        correct: "4"
    },
    {
        title: "What is the name of the actor that plays Jack Sparrow in Pirates of the Carribean?",
        choices: ["Johnny Depp", "Henry Cavill", "Harrison Ford", "Joaquin Phoenix"],
        correct: "Johnny Depp"
    },
    {
        title: "how many licks does it take to get to the center of a tootsie pop?",
        choices: ["5", "400", "15", "The world may never know"],
        correct: "The world may never know"
    }

]

// Runs on clicking start btn
function start() {
    startBtn.classList.add("hide")
    vhsBtn.classList.add("hide")
    answerBtnContainer.classList.remove("hide")
    question.classList.remove("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = -1
    while(scoreDisplayContainer.firstChild){
        scoreDisplayContainer.removeChild(scoreDisplayContainer.firstChild)
    }
    score = 0

    setNextQuestion()

    timerCountDown(75, 'timer')
}
// Timer
function timerCountDown(time, elem) {
    var element = document.getElementById(elem)
    element.innerHTML = time + " seconds remaining."
    element.classList.remove('hide')
    //Clears timer if countdown reaches 0...
    if (time < 1) {
        clearTimeout(timer)
        element.classList.add('hide')
        finish()
        return
    }
    //Or if theres no more questions
    if(currentQuestionIndex > questions.length - 1){
        clearTimeout(timer)
        element.classList.add('hide')
        finish()
        return

    }
    time--
    var timer = setTimeout('timerCountDown(' + time + ',"' + elem + '")', 1000)
}
// Calling the next question
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}
// Finding the next questions information and button information
function showQuestion(question) {
    questionText.innerText = question.title
    for (i = 0; i < questions[currentQuestionIndex].choices.length; i++) {
        var buttons = document.createElement('button')
        buttons.classList.add("answer-buttons")
        buttons.innerText = questions[currentQuestionIndex].choices[i]
        buttons.addEventListener('click', selectAnswer)
        answerBtnContainer.appendChild(buttons)
    }
    
}

//User selecting answer...
function selectAnswer(event){
    var userAnswer = event.target.textContent
    //and checking if that answer is correct
    if(userAnswer === questions[currentQuestionIndex].correct){
        score++
        nextBtn.classList.remove('hide')
        answerBtnContainer.classList.add('hide')
    }
    else{
        nextBtn.classList.remove('hide')
        answerBtnContainer.classList.add('hide')
    }

}
// Reseting the form between questions
function resetState(){
    currentQuestionIndex++ 
    nextBtn.classList.add('hide')
    answerBtnContainer.classList.remove('hide')
    while(answerBtnContainer.firstChild) {
        answerBtnContainer.removeChild(answerBtnContainer.firstChild)
    }
}
// Runs when you run out of time to reset the game
function finish() {
    var scoreDisplay = document.createElement('h2')
    scoreDisplay.innerText = "Your final score is " + score + " out of " + questions.length + "!"
    scoreDisplayContainer.appendChild(scoreDisplay)
    startBtn.classList.remove("hide")
    vhsBtn.classList.remove("hide")
    answerBtnContainer.classList.add("hide")
    question.classList.add("hide")
    startBtn.innerText = "Restart"

    
}
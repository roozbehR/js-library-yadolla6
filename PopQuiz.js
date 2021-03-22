//The quiz object goes here


/*
Sample input of the quiz:

{
    elementId: 'myQuiz'
    {
        title: "What is your name?",
        options: [
            "Jack",
            "Jhon",
            "Jane",
            "Michael"
        ]
        answer: "Michael"
    }
]
time: '1:26'
}
*/


class Quiz {
    constructor(settings) {
        this.validateInput(settings)
        this.element = document.querySelector(settings.elementId);
        if (this.element === null) {
            throw Error("elemendId is either false or it is not created yet");
        }
        this.totalTime = this.giveTotalTime(settings.time.minutes, settings.time.seconds);
        this.score = (new Score()).renderScore();
        this.previousButton = (new PreviousButton()).renderPreviousButton();
        this.nextButton = (new NextButton()).renderNextButton();
        this.timerBox = null;
        this.timeInterval = null;
        this.questionsArr = this.populateQuestions(settings.questionsArr);
        this.questionIndex = 0;
        this.header = document.createElement('div');
        this.questionsPart = document.createElement('div');
        this.bottomPart = document.createElement('div');
    }
    validateInput(settings) {
        let {elementId, questionsArr, time} = settings;
        let {seconds, minutes, hours} = time;
        if (!Array.isArray(questionsArr) || (typeof elementId !== 'string') || !questionsArr.length || typeof seconds === 'string' || typeof minutes === 'string') {
            throw Error('elemendId has to be of type "string", questionsArr has to be a non empty array with quesion objects inside, time has to be a string');
        }
    }
    giveTotalTime = (minutes, seconds) => {
        return ((minutes * 60) + seconds);
    }
    renderTime = () => {
        this.timerBox = document.createElement('div');
        this.timerBox.className = "timer";
        this.timerBox.innerHTML =this.formatTime();
        this.timeInterval = setInterval(this.countDown, 1000);
        return this.timerBox;
    }
    countDown = () => {
        if (this.totalTime === 0) {
            this.timerBox.innerHTML = "Ran out of time!"
            clearInterval(this.timeInterval);
        } 
        else if (this.totalTime > 0) {
            this.totalTime--;
            this.timerBox.innerHTML = this.formatTime();
        }

    }
    formatTime = () => {
        let minutes = Math.floor((this.totalTime/60) % 60);
        let seconds = Math.floor((this.totalTime % 60));
        let time = `${minutes}:${seconds}`;
        if (this.totalTime < 10) {
            time = `0${minutes}:0${seconds}`;
        } else if (minutes < 10) {
            time = `0${minutes}:${seconds}`;
        }
        return time;
    }
    populateQuestions = (questionsArr) => {
        return questionsArr.map(question => (new Question(question, this.score)).renderQuestion());
    }
    showNextQuestion = () => {
        if (this.questionIndex === this.questionsArr.length-1) {
            console.log('cannot move further');
            return;
        }
        this.questionIndex++;
        const oldQ =  document.querySelector('#question-box');
        oldQ.parentNode.replaceChild(this.questionsArr[this.questionIndex], oldQ);
    }
    showPreviousQuestion = () => {
        if (this.questionIndex === 0) {
            console.log('cannot move further');
            return;
        }
        this.questionIndex--;
        const oldQ =  document.querySelector('#question-box');
        oldQ.parentNode.replaceChild(this.questionsArr[this.questionIndex], oldQ);
    }
    render = () => {
        this.header.id = "quiz-header";
        this.questionsPart.id = "quiz-question-part";
        this.bottomPart.id = "quiz-bottom-part";
        this.header.appendChild(this.renderTime());
        this.header.appendChild(this.score);
        this.questionsPart.appendChild(this.questionsArr[this.questionIndex]);
        this.previousButton.addEventListener('click', this.showPreviousQuestion);
        this.bottomPart.appendChild(this.previousButton);
        this.nextButton.addEventListener('click', this.showNextQuestion);    
        this.bottomPart.appendChild(this.nextButton);
        this.element.appendChild(this.header);
        this.element.appendChild(this.questionsPart);
        this.element.appendChild(this.bottomPart);
        
    }
}
class Question {
    constructor(question, score) {
        this.validateInput(question);
        this.title = question.title;
        this.options = question.options;
        this.answer = question.answer;
        this.isAnswered = false;
        this.score =  score;
    }
    validateInput(question) {
        let {title, options, answer} = question;
        if (typeof title !== 'string' || typeof answer !== 'string' || !Array.isArray(options) 
        || options.length !== 4) {
            throw Error('Invalid input for the quesion object');
        }
        const optionsNotString = options.filter((op) => typeof op !== 'string');
        if (optionsNotString.length > 0) {
            throw Error("Invalid option");
        }
        const answerInOption = options.filter(op => answer === op);
        if (answerInOption.length !== 1) {
            throw Error("Answer not in options or more than one option is the answer");
        }
    }
    handleQuestionChosen = (e) => {
        const target = e.target;
        const timerBox = document.querySelector('.timer');
        if (this.isAnswered === false && target.className == 'options' && this.score.innerHTML > -1 && timerBox.innerHTML !== 'Ran out of time!') {
            if (target.innerHTML === this.answer) {
                target.style.backgroundColor = 'green';
                const currentScore = parseInt(this.score.innerHTML);
                this.score.innerHTML = currentScore + 5;
            } else {
                target.style.backgroundColor = 'orange';
                const currentScore = parseInt(this.score.innerHTML);
                this.score.innerHTML = currentScore - 5;
            }
            this.isAnswered = true;
        }
    }
        
    renderQuestion = () => {
        const quesitonBox = document.createElement('div');
        quesitonBox.id = 'question-box';
        const qtitle = (new Title(this.title)).renderTitle();
        quesitonBox.appendChild(qtitle);
        const qList = document.createElement('ul');
        qList.id = 'list-of-options'
        qList.addEventListener('click', this.handleQuestionChosen);
        this.options.map(op => {
            const option = (new Option(op)).renderOption();
            qList.appendChild(option);
        });
        // qList.style = "width: 100%; height: 80%; list-style-type: none; margin: 5px;"
        quesitonBox.appendChild(qList)
        return quesitonBox;
    }
}


class Title {
    constructor(title) {
        this.validateInput(title);
        this.title = title;
    }
    validateInput(title) {
        if (typeof title !== 'string') {
            throw Error("title in the question has to be type of 'string'");
        }
    }
    renderTitle = () => {
        const titleBox = document.createElement('div');
        titleBox.id = 'title-box';
        // titleBox.style = "border: 2px, backgroundColor: blue, borderRadius: 5px, width: 20px, height: 10px; marign: 5px;";
        titleBox.appendChild(document.createTextNode(this.title));
        return titleBox;
    }
}
class Option {
    constructor(op) {
        this.op = op;
    }
    renderOption = () => {
        const listItem = document.createElement('li');
        listItem.className = 'options'
        listItem.appendChild(document.createTextNode(this.op));
        return listItem;
    }
}
class NextButton {
    renderNextButton = () => {
        const nextButton = document.createElement('button')
        nextButton.id = 'next-button';
        nextButton.innerHTML = 'Next'
        return nextButton
    }
}
class PreviousButton {
    renderPreviousButton = () => {
        const previousButton = document.createElement('button')
        previousButton.id = 'previous-button';
        previousButton.innerHTML = 'Previous'
        return previousButton
    }
}
class Timer {
    constructor(time) {
        this.validateInput(time);
        this.time = time;
    }
    validateInput(time) {
        if (typeof time !== 'number' || time < 1) {
            throw Error('time has a positive number');
        }
    }
    rednerTimer = () => {
        const timerBox = document.createElement('div');
        timerBox.className = "timer";
        setInterval(this.countDown, 1000)
        return timerBox;
    }
    startCountDown = () => {
        const timerBox = document.querySelector('.timer');
        timerBox.textContent = `${0}:${this.time}`;
        this.time--;
        if (this.time < 0) {
            timerBox.innerHTML = "Running out of time";
            clearInterval(quizTime);
        }
    }
    competeCountDown = () => {

    }

}
class Score {
    renderScore = () => {
        const scoreBox = document.createElement('div');
        scoreBox.id = 'score-box';
        scoreBox.appendChild(document.createTextNode(0))
        return scoreBox;
    }
}
const makeAQuiz = (json) => {
    const q = new Quiz(json)
    q.render();
}


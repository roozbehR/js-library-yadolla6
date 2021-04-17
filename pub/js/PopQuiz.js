"use strict";
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


(function(global, document) {
    /*************************************** Quiz of the Quiz *************************************** */

/*********************************************************************************************************** */ 

class Quiz {
    constructor(settings) {
        this.#validateInput(settings)
        this.element = document.querySelector(settings.elementId);
        if (this.element === null) {
            throw Error("elemendId is either false or it is not created yet");
        }
        this.element.style = "width: 600px; height: 500px; background-color: #5CDB95; border-radius: 10px; position: relative; margin-left: auto; margin-right: auto; display: flex, flex-wrap: wrap";
        this.totalTime = this.#giveTotalTime(settings.time.minutes, settings.time.seconds);
        this.score = (new Score()).renderScore();
        this.previousButton = (new PreviousButton()).renderPreviousButton();
        this.nextButton = (new NextButton()).renderNextButton();
        this.startButton = null;
        this.submitButton = null;
        this.timerBox = null;
        this.timeInterval = null;
        this.state = { totalTime: this.totalTime, lastSubmitTime: this.totalTime, score: this.score, timerBox: this.timerBox };
        this.questionsArr = this.#populateQuestions(settings.questionsArr);
        this.questionIndex = 0;
        this.header = document.createElement('div');
        this.questionsPart = document.createElement('div');
        this.bottomPart = document.createElement('div');
        this.popUp = null;
        this.loader = null;
        this.intuitionButton = null;
    }

    #renderSpinner = () => {
        const spinnerBox = document.createElement('div');
        spinnerBox.className = "wrapper";
        const loader = document.createElement('div');
        loader.className = "loader";
        const vBar1 = document.createElement('div');
        vBar1.className = "v-bar first";
        const vBar2 = document.createElement('div');
        vBar2.className = "v-bar second";
        const vBar3 = document.createElement('div');
        vBar3.className = "v-bar third";
        loader.appendChild(vBar1);
        loader.appendChild(vBar2);
        loader.appendChild(vBar3);
        spinnerBox.appendChild(loader);
        return spinnerBox;
    } 

    
    #validateInput(settings) {
        let { elementId, questionsArr, time } = settings;
        let { seconds, minutes, hours } = time;
        if (!Array.isArray(questionsArr) || (typeof elementId !== 'string') || !questionsArr.length || typeof seconds === 'string' || typeof minutes === 'string') {
            throw Error('elemendId has to be of type "string", questionsArr has to be a non empty array with quesion objects inside, time has to be a string');
        }
    }

    #populateQuestions = (questionsArr) => {
        return questionsArr.map(question => (new Question(question, this.score, this.state)).renderQuestion());
    }

    #giveTotalTime = (minutes, seconds) => {
        return ((minutes * 60) + seconds);
    }
    #renderTime = () => {
        this.timerBox = document.createElement('li');
        this.timerBox.className = "timer";
        this.timerBox.innerHTML = this.#formatTime();
        this.timeInterval = setInterval(this.#countDown, 1000);
        return this.timerBox;
    }

    #formatTime = () => {
        let minutes = Math.floor((this.state.totalTime / 60) % 60);
        let seconds = Math.floor((this.state.totalTime % 60));
        let time = `${minutes}:${seconds}`;
        if (this.state.totalTime < 10) {
            time = `0${minutes}:0${seconds}`;
        } else if (minutes < 10) {
            time = `0${minutes}:${seconds}`;
        }
        return time;
    }

    #countDown = async () => {
        if (this.state.totalTime <= 0) {
            this.timerBox.innerHTML = "00:00"
            clearInterval(this.timeInterval);
            this.#showFinishedTime();
        }
        else {
            if (this.state.totalTime <= 10) {
                this.timerBox.style.animation = "crescendo 0.3s alternate infinite ease-in";
                this.timerBox.style.borderColor = "red";

            }
            if (this.state.totalTime > 10) {
                this.timerBox.style.animation = "none";
                this.timerBox.style.borderColor = "gold";
            }
            this.state.totalTime--;
            this.timerBox.innerHTML = this.#formatTime();
        }
    }
    #delay = ms => new Promise(res => setTimeout(res, ms));
    #removeLoader = () => {
        this.element.removeChild(this.loader);
    }
    #showFinishedTime = () => {
        this.popUp = (new PopUp('Time is up! your score is ' + this.score.innerHTML)).renderPopUp();
        this.element.insertBefore(this.popUp, this.element.firstChild);
        clearInterval(this.timeInterval);
    }

    #showNextQuestion = () => {
        if (this.questionIndex === this.questionsArr.length - 1) {
            console.log('cannot move further');
            return;
        }
        this.questionIndex++;
        const oldQ = document.querySelector('#question-box');
        oldQ.parentNode.replaceChild(this.questionsArr[this.questionIndex], oldQ);
    }

    #showPreviousQuestion = () => {
        if (this.questionIndex === 0) {
            console.log('cannot move further');
            return;
        }
        this.questionIndex--;
        const oldQ = document.querySelector('#question-box');
        oldQ.parentNode.replaceChild(this.questionsArr[this.questionIndex], oldQ);
    }

    render = () => {
        if (this.popUp !== null) {
            this.element.appendChild(this.popUp);
        }
        else {
            this.#renderTheQuiz();
        }
        // this.element.appendChild(this.progress);

    }

    #renderTheQuiz = async (e) => {
        if (this.popUp !== null) {
            this.element.removeChild(this.popUp);
        }
        if (this.loader !== null) {
            this.element.appendChild(this.loader);
            await this.#delay(3000);
            this.#removeLoader();
        }
        this.header.id = "quiz-header";
        this.questionsPart.id = "quiz-question-part";
        this.bottomPart.id = "quiz-bottom-part";
        const headUL = document.createElement('ul');
        this.timerBox = this.#renderTime();
        headUL.appendChild(this.timerBox);
        headUL.appendChild(this.score);
        this.header.appendChild(headUL);
        // this.header.appendChild(this.#renderTime());
        // this.header.appendChild(this.score);
        if (this.submitButton !== null) {
            this.submitButton.addEventListener('click', this.#submitQuiz);
            this.header.appendChild(this.submitButton);
        }
        const observer = new MutationObserver(this.#showGameOver);
        observer.observe(this.score, { subtree: true, childList: true });
        this.questionsPart.appendChild(this.questionsArr[this.questionIndex]);
        this.previousButton.addEventListener('click', this.#showPreviousQuestion);
        this.bottomPart.appendChild(this.previousButton);
        if (this.intuitionButton !== null) {
            this.bottomPart.appendChild(this.intuitionButton);
        }
        this.nextButton.addEventListener('click', this.#showNextQuestion);
        this.bottomPart.appendChild(this.nextButton);
        this.element.appendChild(this.header);
        this.element.appendChild(this.questionsPart);
        this.element.appendChild(this.bottomPart);
    }

    #showGameOver = () => {
        if (this.score.innerHTML < 0) {
            this.popUp = (new PopUp("Game Over, your score is less than zero!")).renderPopUp();
            this.element.insertBefore(this.popUp, this.element.firstChild);
            clearInterval(this.timeInterval);
        }
    }
    #submitQuiz = () => {
        this.popUp = (new PopUp("Your quiz is submitted, your score is " + this.score.innerHTML)).renderPopUp();
        this.element.insertBefore(this.popUp, this.element.firstChild);
        clearInterval(this.timeInterval);
    }
    #increaseTime = () => {
        this.state.totalTime = this.state.totalTime + 10;
        this.timerBox.innerHTML = this.#formatTime();
        this.intuitionButton.removeEventListener('click', this.#increaseTime);
        this.intuitionButton.disabled = true;

    }

    /********************************************API to use in the quiz******************************************************************** */
    
    addStartQuiz = () => {
        this.startButton = (new StartButton()).renderStartButton();
        this.startButton.addEventListener('click', this.#renderTheQuiz);
        this.popUp = (new PopUp("Click this button whenever you are ready")).renderPopUp();
        this.popUp.append(this.startButton);

    }
    addSubmitButton = () => {
        this.submitButton = (new SubmitButton()).renderSubmitButton();
    }
    addLoader = () => {
        this.loader = this.#renderSpinner();
    }
    addTimeAbility = () => {
        this.intuitionButton = document.createElement('input');
        this.intuitionButton.type = 'checkbox';
        this.intuitionButton.className = "l";
        this.intuitionButton.addEventListener('click', this.#increaseTime);
    }
}

/*************************************** Question of the Quiz *************************************** */

/*********************************************************************************************************** */ 

class Question {
    constructor(question, score, props) {
        this.validateInput(question);
        this.title = question.title;
        this.options = question.options;
        this.answer = question.answer;
        this.isAnswered = false;
        this.score = score;
        this.props = props;
    }

    validateInput(question) {
        let { title, options, answer } = question;
        if (typeof title !== 'string' || typeof answer !== 'string' || !Array.isArray(options)
            || options.length > 4) {
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
        if (this.isAnswered === false && target.className == 'options' && this.score.innerHTML > -1 && timerBox.innerHTML !== '00:00') {
            if (target.innerHTML === this.answer) {
                target.style.backgroundColor = 'green';
                const totalTime = this.props.totalTime;
                const lastSubmitTime = this.props.lastSubmitTime;
                const timeDiff = Math.abs(totalTime - lastSubmitTime);
                const currentScore = parseInt(this.score.innerHTML);
                console.log("Total time is: "+ totalTime, "Last time submitted is: " + lastSubmitTime, "Time diff is: " + timeDiff);
                if (timeDiff <= 0.1*totalTime) {
                    this.score.innerHTML = currentScore + 10;
                    this.props.lastSubmitTime = this.props.totalTime;
                } else if (timeDiff <= 0.2*totalTime) {
                    this.score.innerHTML = currentScore + 7;
                    this.props.lastSubmitTime = this.props.totalTime;
                } else {
                    this.score.innerHTML = currentScore + 5;
                    this.props.lastSubmitTime = this.props.totalTime;
                }
            } else {
                target.style.backgroundColor = 'red';
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

/*************************************** Title of the question *************************************** */

/*********************************************************************************************************** */

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
/*************************************** Option of the questions *************************************** */

/*********************************************************************************************************** */ 

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

/*************************************** NextButton of the Quiz *************************************** */

/*********************************************************************************************************** */ 

class NextButton {
    renderNextButton = () => {
        const nextButton = document.createElement('button')
        nextButton.className = 'quiz-button';
        nextButton.innerHTML = 'Next'
        return nextButton
    }
}

/*************************************** Previous of the Quiz *************************************** */

/*********************************************************************************************************** */ 

class PreviousButton {
    renderPreviousButton = () => {
        const previousButton = document.createElement('button')
        previousButton.className = 'quiz-button';
        previousButton.innerHTML = 'Previous'
        return previousButton
    }
}

/*************************************** StartButton of the Quiz *************************************** */

/*********************************************************************************************************** */ 

class StartButton {
    renderStartButton = () => {
        const startButton = document.createElement('button')
        startButton.className = 'start-button';
        startButton.innerHTML = 'Start';
        return startButton;
    }
}


/*************************************** Submit of the Quiz *************************************** */

/*********************************************************************************************************** */ 

class SubmitButton {
    renderSubmitButton = () => {
        const submitButton = document.createElement('button');
        submitButton.className ='submit-quiz-button';
        submitButton.innerHTML = 'Submit';
        return submitButton;
    }
}



/*************************************** Score of the Quiz *************************************** */

/*********************************************************************************************************** */ 

class Score {
    renderScore = () => {
        const scoreBox = document.createElement('li');
        scoreBox.className = 'score-box';
        scoreBox.appendChild(document.createTextNode(0))
        return scoreBox;
    }
}

/*************************************** PopUp of the Quiz *************************************** */

/*********************************************************************************************************** */ 

class PopUp {
    constructor(message) {
        this.message = message;
    }
    renderPopUp = () => {
        const popUp = document.createElement('div')
        popUp.className = 'popUp';
        const welcomeText = document.createElement('div');
        welcomeText.id = 'welcome-text'
        welcomeText.appendChild(document.createTextNode(this.message));
        popUp.appendChild(welcomeText);
        return popUp;
    }
}

global.Quiz = global.Quiz || Quiz;
}) (window, window.document);




/*
If i get time:
modify the scoring system a bit more, let the user set a score, add a nice overlay, add intuiton button
*/
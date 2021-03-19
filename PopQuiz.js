//The quiz object goes here


/*
Sample input of the quiz:

{
    elementId: 'myQuiz'
    questionsArr = [
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
        this.questionsArr = this.populateQuestions(settings.questionsArr);
        console.log(this.questionsArr[0]);
        this.questionIndex = 0;
    }
    //Validates theb given settings to the Quiz consructor
    validateInput(settings) {
        let {elementId, questionsArr, time} = settings;
        if (!Array.isArray(questionsArr) || (typeof elementId !== 'string') || !questionsArr.length || typeof time !== 'string') {
            throw Error('elemendId has to be of type "string", questionsArr has to be a non empty array with quesion objects inside, time has to be a string');
        }
    }
    populateQuestions = (questionsArr) => {
        return questionsArr.map(question => (new Question(question)).renderQuestion());
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
        this.element.style.width = '500px';
        this.element.style.height = '400px';
        this.element.style.borderRadius = '10px';
        this.element.style.backgroundColor = 'red';
        this.element.style.display = 'flex';
        this.element.style.alignItems = 'center';
        this.element.style.justifyContent = 'center';
        this.element.appendChild(this.questionsArr[this.questionIndex]);
        const nextButton = (new NextButton()).renderNextButton();
        nextButton.addEventListener('click', this.showNextQuestion); 
        this.element.appendChild(nextButton);
        const previousButton = (new PreviousButton()).renderPreviousButton();
        previousButton.addEventListener('click', this.showPreviousQuestion);
        this.element.appendChild(previousButton); 
        // this.element.appendChild((new Score()).renderScore());
        // this.element.appendChild((new Timer(10)).rednerTimer());
        
    }
}


class Question {
    constructor(question) {
        this.validateInput(question);
        this.title = question.title;
        this.options = question.options;
        this.answer = question.answer;
        this.isAnswered = false;
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
        if (this.isAnswered === false && target.className == 'options') {
            if (target.innerHTML === this.answer) {
                target.style.backgroundColor = 'green';
            } else {
                target.style.backgroundColor = 'orange';
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
        // listItem.style = 'width: 300px; height: 20px; border-radius: 5px; margin: 10px; background-color: Aqua; text-align: center;'
        listItem.appendChild(document.createTextNode(this.op));
        return listItem;
    }
}

class Score {
    constructor() {
        this.score = 0;
    }
    renderScore = () => {
        const scoreBox = document.createElement('div');
        scoreBox.className = 'scoreBox';
        scoreBox.appendChild(document.createTextNode("Score: "+ this.score));
        return scoreBox;
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
// class Timer {
//     constructor(time) {
//         this.validateInput(time);
//         this.time = time;
//     }
//     validateInput(time) {
//         if (typeof time !== 'number' || time > 60 || time < 0) {
//             throw Error('time has to be a number from 1 to 60 seconds inclusive');
//         }
//     }
//     rednerTimer = () => {
//         const timerBox = document.createElement('div');
//         timerBox.className = "timer";
//         setInterval(this.countDown, 1000)
//         return timerBox;
//     }
//     countDown = () => {
//         const timerBox = document.querySelector('.timer');
//         timerBox.textContent = `${0}:${this.time}`;
//         this.time--;
//         if (this.time < 0) {
//             timerBox.innerHTML = "Running out of time";
//             clearInterval(quizTime);
//         }
//     }

// }





























































// class Question {
//     // constructor(question) {
//     //     this.text = question.title;
//     //     this.options = question.options;
//     //     this.answer = question.answer;
//     // }
//     renderQuestion = (element) => {
//         const box = document.createElement('div');
//         box.className = "question-box";
//         box.style.height = '200px';
//         box.style.width = '200px';
//         box.style.backgroundColor = 'blue';
//         element.append(box);
//     }
// }




//Creates the quiz template
// function makeQuizBox() {
//     const allDocElements = document.querySelectorAll();
//     const elementsWithSameId = allDocElements(element => element.id === 'myQuiz');
//     if (elementsWithSameId.length > 0) {
//         console.log("Remove the elment with 'myQuizId', then make create your quiz");
//         return;
//     }
//     const quiz = document.createElement('div');
//     quiz.id = 'myQuiz';
//     quiz.style = 'width: 500px; height: 500pxpx; background-color: Aqua;'
//     const body = document.querySelector('body');
//     body.append(quiz);
// }
// //Looks for duplicates in the given questions array
// function lookForDuplicates(questions) {
//     const res = [];
//     for (let i = 0; i < questions.length; i++) {
//         if (!res.includes(questions[i])) {
//             res.push(questions[i]);
//         }
//      }
//     return res;
// }
// //Checks if the give questions are valid or not
// function InvalidInput(questions) {
//     if (!questions.length || !Array.isArray(questions)) {
//         console.log("Wrong input or the array is empty!");
//         return;
//     }
// }
// Quiz.prototype = {
//     makeQuiz: function () {
//         const allDocElements = document.querySelectorAll();
//         const elementsWithSameId = allDocElements(element => element.id === 'myQuiz');
//         if (elementsWithSameId.length > 0) {
//             console.log("Remove the elment with 'myQuizId', then make create your quiz");
//             return;
//         }
//         const quiz = document.createElement('div');
//         quiz.id = 'myQuiz';
//         quiz.style = 'width: 500px; height: 500pxpx; background-color: Aqua;'
//         const body = document.querySelector('body');
//         body.append(quiz);
//     }
// }


const makeAQuiz = (json) => {
    const q = new Quiz(json)
    q.render();
}
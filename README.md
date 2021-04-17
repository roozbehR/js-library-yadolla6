# js-library-yadolla6 - PopQuiz

Welcome to PopQuiz, a javascript lirbrary to build coginitve games, quizzes, and online assemssments quickly and easily.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Heroku Link](#heroku-link)
- [Getting Started With PopQuiz](#getting-started-with-PopQuiz)
  - [Setting Up PopQuiz](#setting-up-popquiz)
- [How To Use PopQuiz](#how-to-use-popquiz)

  - [Creating a div in the DOM](#creating-a-div-in-the-dom)
  - [Creating a js File That is Going to Use the Library](#creating-a-js-file-that-is-going-to-use-the-library)
  - [Use the APIs Provided to Style Your Quiz](#use-the-apis-provided-to-style-your-quiz)
  - [Render Your Quiz](#render-your-quiz)

- [List of APIs Provided by PopQuiz](#list-of-apis-provided-by-popquiz)
  - [Adding a Start Page to the Quiz](#adding-a-start-page-to-the-quiz)
  - [Adding a Submit Button to the Quiz](#adding-a-submit-button-to-the-quiz)
  - [Adding a Loader to the Quiz](#adding-a-loader-to-the-quiz)
  - [Adding a Time Booster to the Quiz] (#adding-a-time-booster-to-the-quiz)
- [Libraries & Frameworks Used](#libraries---frameworks-used)

## Heroku Link

https://moviebook309.herokuapp.com/ (Ensure that it is running in https as some requests may not work)

## Getting Started With PopQuiz

From CLI run the command `git clone https://github.com/csc309-winter-2021/js-library-yadolla6.git`

### Setting Up PopQuiz

From CLI navigate into the cloned directory

Switch into the pub directory using `cd pub`

Once you are in the `pub` directory you will see a js folder and a css folder

Copy the full path of `PopQuiz.js` in the js folder and include it in the script tag in the head of an html file you want to use the library in

This will look like following:

```
<script defer type="text/javascript" src='path/form/your/html/folder/to/js/PopQuiz.js'></script>
```

Copy the full path of `PopQuiz.css` in the css folder and include it in link tag in the head of an html file you want to use the library in

This will look like following:

```
<link rel="stylesheet" href="'path/form/your/html/folder/to/css/PopQuiz.css'">
```

Now the setup is ready and you can use PopQuiz.js for your application

## How To Use PopQuiz

### Creating a div in the DOM

Before using the library to build the quiz, create a `div` element with a unique `id` that is gonna be used as the place holder for the quiz

Consider following code snippet as an example

_Example_

```
<div id="uniqueQuizId" href="'path/form/your/html/folder/to/css/PopQuiz.css'">
```

### Creating a js File That Is Going to Use the Library

Then create a js file that you want to use the library in, lets call it `example.js` as an instance

Once created the js file create a new quiz object in `example.js`

Consider following code snippet as an example:

_Example_

```
const quiz1 = new Quiz(json);

```

_json parameters_

The json containst the paramters that the quiz requires and they have to be exactly as the example given below.

elementId: is a div that the user creates before hand in the DOM and passes its id to the elementId as a string.
questionsArr: Is an array of questions objects.
time: This is a time object with minutes and seconds as its keys which both have to be integers.

_Example_

```
{
    elementId: '#myQuiz'
    questionsArr: [{
        title: 'What is first letter of Hi?',
        options: ['K',
            'J',
            'H',
            'M'],
        answer: 'H'
    },
    {
        title: 'What year is it ?',
        options: ['2020',
            '2021',
            "1998",
            "1920"],
        answer: '2021'
    },
    {
        title: 'True or False ? PopQuiz is Fun',
        options: ['True',
            'False'],
        answer: 'True'
    },
    {
        title: 'Is 309 the best web class ?',
        options: ['Yes',
            'No',
            "I dont know",
            "Maybe"],
        answer: 'Yes'
    },
    {
        title: 'Who is the president of US ?',
        options: ['Trump',
            'Biden',
            "Bush",
            "Carter"],
        answer: 'Biden'
    },
    {
        title: 'Where is Canada ?',
        options: ['America',
            'Africa',
            "Asia",
            "Europe"],
        answer: 'America'
    }],
    time: {
        minutes: 0,
        seconds: 15
    }
}

```

quesion object has following key value pairs:
title: a string that represnets the title of the question.
options: an array of strings that represnets options of the question
answer: a string that represnets the answer of the quiz.

_Example of question object:_

```
    {
        title: 'What year is it ?',
        options: ['2020',
            '2021',
            "1998",
            "1920"],
        answer: '2021'
    }
```

### Use the APIs Provided to Style Your Quiz

Once the quiz object created, you can add the functionalities you like to the quiz using the APIs provided by the quiz

### Render Your Quiz

Only at the **end**, once you finished adding what you want to the quiz, render the quiz using its render API provided

Consider following code snippet as an example how to render the quiz:

_Example_

```

quiz1.render();

```

What this provides is a quiz with bundle of functionalities and rules. Following are the default funtionalites of the quiz:

```

• A timer: Represnet time of the quiz.
• A score counter: reprensets how many points the user has.
• Alert: this timer also alerts the user if their time is below 10 seconds which means it is going to run out soon. If the time runs out you lose the quiz/game.
• A score system: this score system is in a way that the faster you answer a question correctly the more points you get and the slower you answer the less points you get.
The lowest point you can get is 5 points.
• If you answer a qeustion wrong you will lose points
• If you run out of time you lose the quiz/game.
• If your score becomes negative you lose the quiz/game
• You should always try to maintain a postive score to be able to continue the game

```

**Once the quiz renders you should not change it**

## List of APIs Provided by PopQuiz

**You can call these APIs after you instantiated a quiz object**

### Adding a Start Page to the Quiz

This API allows the user to create and overlay for the quiz which is a page that has a start button. Once the user is ready they can click the start button and do the quiz. Without using this API the quiz starts right after the quiz is rendered in the DOM

_Example Call_

```

quiz1.addStartQuiz();

```

**This returns an array of users, the sample shown above is not complete.**

### Adding a Submit Button to the Quiz

This api adds a submit button to the quiz, hence gives the ability to the user to submit the quiz whenever they want. As a result user doesn't have to wait until the timer is over and can submit their quiz whenever they want

_Example Call_

```

quiz1.addSubmitButton();

```

### Adding a Loader to the Quiz

This api enables the user to make thier quiz fancy by creating a loader. Uisng this api, once the user starts the quiz, there will be a 3 second loading which appears on the page with a nice animation and then the quiz starts

_Example Call_

```

quiz1.addLoader();

```

### Adding a Time Booster to the Quiz

This api adds a 'lamp' to the buttom of the quiz. Once this lamp is hit the user adds 10 seconds to the remaining time they have left. This acts as a timer booster to make the quiz more intresting and the user can only and only use it once per quiz.

_Example Call_

```

quiz.addTimeAbility();

```

## Libraries & Frameworks Used

- Vanilla JavaScript
- CSS
- HTML

```

```

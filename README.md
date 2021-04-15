# js-library-yadolla6 - PopQuiz

Welcome to PopQuiz, a javascript lirbrary to build coginitve games, quizzes, and online assemssments quickly and easily.
Here is how to get started and use the library.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Heroku Link](#heroku-link)
- [Getting Started With PopQuiz](#getting-started-with-PopQuiz)
  - [Setting Up PopQuiz](#run-the-front-end)
- [How To Use PopQuiz](#how-to-use-the-application)
  - [Creating a div in the DOM](#logging-in)
  - [Looking at Movies](#looking-at-movies)
    - [Individual Movies](#individual-movies)
      - [Leaving a Review](#leaving-a-review)
      - [Leaving a comment](#leaving-a-comment)
  - [Viewing Profiles](#viewing-profiles)
  - [Updating Own Profile](#updating-own-profile)
    - [Updating Biography](#updating-biography)
    - [Uploading a new Picture](#uploading-a-new-picture)
  - [Viewing User Feed](#viewing-user-feed)
  - [Searching for Movies](#searching-for-movies)
  - [Logging Out](#logging-out)
  - [Administration Panel **(Admins Only)**](#administration-panel----admins-only---)
- [Backend Routes & Middleware](#backend-routes---middleware)
  - [Middleware](#middleware)
    - [mongoChecker](#mongochecker)
    - [authenticateAdmin](#authenticateadmin)
    - [authenticate](#authenticate)
    - [unauthenticate](#unauthenticate)
  - [Backend Routes](#backend-routes)
    - [Logging in and out](#logging-in-and-out)
      - [Log in](#log-in)
      - [Log Out](#log-out)
    - [Registering a user](#registering-a-user)
    - [Getting user details](#getting-user-details)
    - [Follow a user](#follow-a-user)
    - [Get Movie by ID](#get-movie-by-id)
    - [Get Random Movie](#get-random-movie)
    - [Get New Movies](#get-new-movies)
    - [Adding a review](#adding-a-review)
    - [Add a comment to a review](#add-a-comment-to-a-review)
    - [Get Comments based on review id](#get-comments-based-on-review-id)
    - [Get all reviews by a User](#get-all-reviews-by-a-user)
    - [Get all comments by a User](#get-all-comments-by-a-user)
    - [Get User's Favourite Movies](#get-user-s-favourite-movies)
    - [Update User Biography](#update-user-biography)
    - [Update User Picture](#update-user-picture)
    - [Get User Feed](#get-user-feed)
    - [Admin APIs](#admin-apis)
      - [Getting all Users](#getting-all-users)
      - [Delete User](#delete-user)
      - [Update User (Admin Rights)](#update-user--admin-rights-)
      - [Add Movie](#add-movie)
    - [Search Functionality](#search-functionality)
      - [Searching for movies](#searching-for-movies)
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

## How To Use PopQuiz.js

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

### Use the APIs Provided to Style Your Quiz

Once the quiz object created, you can add the functionalities you like to the quiz using the APIs provided by the quiz

### Render Your Quiz

Only at the **end**, once you finished adding what you want to the quiz, render the quiz using its render API provided

Consider following code snippet as an example how to render the quiz:

_Example_

```
quiz1.render();
```

This will render your quiz and show it to you on you webpage

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

quiz1.quiz1.addLoader();

```

## Libraries & Frameworks Used

- Vanilla JavaScript
- CSS
- HTML

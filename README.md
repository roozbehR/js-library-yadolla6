# js-library-yadolla6 - PopQuiz

Welcome to PopQuiz, a javascript lirbrary to build coginitve games, quizzes, and online assemssments quickly and easily.
Here is how to get started and use the library.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Heroku Link](#heroku-link)
- [Setting up PopQuiz](#setting-up-moviebook)
  - [Run the Front-End](#run-the-front-end)
  - [Running the Back-End](#running-the-back-end)
- [User Credentials](#user-credentials)
- [How To Use The Application](#how-to-use-the-application)
  - [Logging in](#logging-in)
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

### Settin Up PopQuiz

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

Then create a js file that you want to use the library in `example.js` as an instance

Once created the js file create a new quiz object in `example.js`

Consider following code snippet as an example:

_Example_

```
const quiz1 = new Quiz(json);
```

Once the quiz object created, you can add the functionalities you like to the quiz using the API provides by the quiz

Only at the **end**, once you finished adding what you want to the quiz render the quiz

Consider following code snippet as an example how to render the quiz:

_Example_

```
quiz1.render();
```

This will render your quiz and show it to you on you webpage

**Once the quiz renders you will not be able to change it**

![Sign in Button](documentationImages/logging-in/sign-in-button.png)

If the login in successful you will be authenticated to have access to different pages.
To sign out, you may click on the log out button in the navigation bar.

## List of APIs provided by PopQuiz.js

#### Admin APIs

**These routes will only work if the user is an Admin (Please use the admin user to test)**

##### Getting all Users

This route gets a list of all the users that are currently stored in the database. This is used to display the table of users in the Admin Panel. The table is where Admins can update rights or delete users.

_Example Call_

```
GET http://localhost:5000/api/admin/allusers
```

There is no request body to this request.

_Example Response_

```
{
    "user": [
        {
            "likedMovies": [],
            "followingUser": [
                "606785445048bb1d7c886c05",
                "60673dc4a3aad9116bd1d2f8"
            ],
            "usersIfollow": [],
            "_id": "60631931ae924a0807a7a951",
            "username": "bassel10",
            "__v": 0,
            "fullName": "Default Fullname",
            "picture": "/images/profile.png",
            "isAdmin": true
        },
```

**This returns an array of users, the sample shown above is not complete.**

##### Delete User

This DELETE route is used to delete a user from the application. The endpoint is `/api/admin/user/:id` where `:id` is replaced with the object ID of the user to be deleted.

_Example Call_

```
DELETE http://localhost:5000/api/admin/user/606e1507c7b52310b6ae0a68
```

There is no request body in this request.

_Example Response_

```
{
    "likedMovies": [],
    "followingUser": [],
    "usersIfollow": [],
    "_id": "606e1507c7b52310b6ae0a68",
    "username": "user123",
    "password": "$2a$10$VA65Vs3Q7Lv0lK8cw1ss6u3sYjNRt48KKnR3GTHHimcOe.zUJQ0r6",
    "fullName": "user 123",
    "picture": "/images/profile.png",
    "biography": "I love MovieBook!",
    "isAdmin": false,
    "__v": 0
}
```

##### Update User (Admin Rights)

A PUT request used to update the _isAdmin_ property of a user, to elevate or demote them.  
The endpoint is `/api/admin/user/:id` where the object id of the use is appended to the URL. A JSON request body with the parameter _isAdmin_ is expected.

_Example Call_

```
PUT http://localhost:5000/api/admin/user/60631931ae924a0807a7a951
```

_Request body_

```
{
    "isAdmin": false
}
```

_Example Response_

```
{
    "likedMovies": [],
    "followingUser": [
        "606785445048bb1d7c886c05",
        "60673dc4a3aad9116bd1d2f8"
    ],
    "usersIfollow": [],
    "_id": "60631931ae924a0807a7a951",
    "username": "bassel10",
    "password": "$2a$10$pYckU5vO1on9riUT1ts0u./Gx1gjplqJkugARMNN1R2tf32pyUfOK",
    "__v": 0,
    "fullName": "Default Fullname",
    "picture": "/images/profile.png",
    "isAdmin": true
}
```

##### Add Movie

This POST request is used to add a movie to the database. The endpoint is `/api/admin/addmovie`.  
_Example Call_

```
POST http://localhost:5000/api/admin/addmovie
```

The request body needs 5 attributes:

- "title": "value1"
- "plot": "value2"
- "runtime": int1
- "year": int2
- "poster": "value3"

_Example Request Body_

```
{
    "title": "jaws3",
    "plot": "a killer shark looks to attack beachgoes",
    "runtime": 91,
    "year": 1996,
    "poster": "/images/15.jpg"
}
```

_Example Response_

```
{
    "genres": [],
    "cast": [],
    "countries": [],
    "directors": [],
    "writers": [],
    "_id": "606e28d5367d391659dca850",
    "title": "jaws3",
    "fullplot": "a killer shark looks to attack beachgoes",
    "plot": "a killer shark looks to attack beachgoes",
    "runtime": 91,
    "year": 1996,
    "poster": "/images/15.jpg",
    "__v": 0
}
```

#### Search Functionality

##### Searching for movies

A get request is used to search for movies in the database. The endpoint here is `/api/search/movies/:name`

The endpoint takes in the name of the movie in the URL so there are no values in the body.

_Example call_

```
GET http://localhost:5000/api/search/movies/black pirate
```

The response to this should be an array of movies with a name that matches the URL parameter provided.  
_Example response_

```
[
    {
        "genres": [
            "Adventure",
            "Action"
        ],
        "cast": [
            "Billie Dove",
            "Tempe Pigott",
            "Donald Crisp",
            "Sam De Grasse"
        ],
        "countries": [
            "USA"
        ],
        "directors": [
            "Albert Parker"
        ],
        "writers": [
            "Douglas Fairbanks (story)",
            "Jack Cunningham (adapted by)"
        ],
        "_id": "573a1391f29313caabcd8268",
        "plot": "Seeking revenge, an athletic young man joins the pirate band responsible for his father's death.",
        "runtime": 88,
        "num_mflix_comments": 2,
        "poster": "https://m.media-amazon.com/images/M/MV5BMzU0NDkyMjEzMV5BMl5BanBnXkFtZTgwMTcyMzEyMjE@._V1_SY1000_SX677_AL_.jpg",
        "title": "The Black Pirate",
        "fullplot": "A nobleman vows to avenge the death of his father at the hands of pirates. To this end he infiltrates the pirate band. Acting in character he is instrumental in the capture of a ship, but things are complicated when he finds that there is a young woman on board whom he wishes to protect from the threat of rape.",
        "released": "1926-03-08T00:00:00.000Z",
        "awards": {
            "wins": 1,
            "nominations": 0,
            "text": "1 win."
        },
        "lastupdated": "2015-08-22 01:10:11.970000000",
        "year": 1926,
        "imdb": {
            "rating": 7.2,
            "votes": 1146,
            "id": 16654
        },
        "type": "movie",
        "tomatoes": {
            "viewer": {
                "rating": 3.3,
                "numReviews": 1390,
                "meter": 70
            },
            "dvd": "1999-10-12T00:00:00.000Z",
            "critic": {
                "rating": 8.1,
                "numReviews": 9,
                "meter": 100
            },
            "lastUpdated": "2015-07-22T19:23:50.000Z",
            "rotten": 0,
            "fresh": 9
        }
    }
]
```

## Libraries & Frameworks Used

- React
- Ant Design
- React Slick
- Cloudinary
- MongoDB
- Express

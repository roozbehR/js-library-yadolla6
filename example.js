/* JS Library usage examples */
"use strict";


// Circle Generator
makeAQuiz({
    elementId: "#myQuiz",
    questionsArr: [
        {
            title: "Q1",
            options: [
                "1",
                "2",
                "3",
                "4"
            ],
            answer: "1"
        },
        {
            title: "Q2",
            options: [
                "1",
                "2",
                "3",
                "4"
            ],
            answer: "2"
        },
        {
            title: "Q3",
            options: [
                "1",
                "2",
                "3",
                "4"
            ],
            answer: "3"
        },
        {
            title: "Q4",
            options: [
                "1",
                "2",
                "3",
                "4"
            ],
            answer: "4"
        },
        {
            title: "Q5",
            options: [
                "1",
                "2",
                "3",
                "4"
            ],
            answer: "1"
        }
    ],
    time: {
        minutes: 0,
        seconds: 10
    }
});


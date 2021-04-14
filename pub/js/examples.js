/* JS Library usage examples */
"use strict";


// Circle Generator
// makeAQuiz({
//     elementId: "#myQuiz",
//     questionsArr: [
//         {
//             title: "Q1",
//             options: [
//                 "1",
//                 "2",
//                 "3",
//                 "4"
//             ],
//             answer: "1"
//         },
//         {
//             title: "Q2",
//             options: [
//                 "1",
//                 "2",
//                 "3",
//                 "4"
//             ],
//             answer: "2"
//         },
//         {
//             title: "Q3",
//             options: [
//                 "1",
//                 "2",
//                 "3",
//                 "4"
//             ],
//             answer: "3"
//         },
//         {
//             title: "Q4",
//             options: [
//                 "1",
//                 "2",
//                 "3",
//                 "4"
//             ],
//             answer: "4"
//         },
//         {
//             title: "Q5",
//             options: [
//                 "1",
//                 "2",
//                 "3",
//                 "4"
//             ],
//             answer: "1"
//         }
//     ],
//     time: {
//         minutes: 0,
//         seconds: 10
//     }
// });

makeAQuiz({
    elementId: '#myQuiz',
    questionsArr: [{
        title: 'Where is this place?',
        options: ['PopQuiz',
            'Canada',
            'Random Place'],
        answer: 'PopQuiz'
    },
    {
        title: 'Are you a csc309 student?',
        options: ['Yes',
            'No',
            "I don't know"],
        answer: 'Yes'
    },
    {
        title: 'Who is csc309 professor?',
        options: ['Mark Kazakevich',
            'Random Guy',
            "Me"],
        answer: 'Mark Kazakevich'
    }],
    time: {
        minutes: 0,
        seconds: 15
    }
});

makeAQuiz({
    elementId: '#myQuiz2',
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
    }],
    time: {
        minutes: 0,
        seconds: 3
    }
});


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
    questionsArr: [{title: 'Where is this place?',
                    options: ['PopQuiz',
                              'Canada',
                              'Random Place'],
                    answer: 'PopQuiz'},
                    {title: 'Are you a csc309 student?',
                    options: ['Yes',
                               'No',
                               "I don't know"],
                    answer: 'Yes'}],
    time: {minutes: 0,
           seconds: 10}});


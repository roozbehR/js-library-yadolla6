"user strict;"

const quiz = new Quiz({
    elementId: '#myQuiz',
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
});
quiz.addStartQuiz();
quiz.addLoader();
quiz.addSubmitButton();
quiz.addTimeAbility();
quiz.render();


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


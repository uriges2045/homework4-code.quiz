const GameQuestions = [
    {
        questions: {
            Question: 'Which of the following is not an inbuilt package??',
            Answers: ['java.lang', 'java.file', 'java.time, Do!','java.beans'],
            correct: 'java.file'
        }
    },
    {
        questions: {
            Question: 'Which of the following is preferred while programming with Threads',
            Answers: ['StringBuffer', 'StringBuilder','Both'],
            correct: 'StringBuffer'
        }
    },
    {
        questions: {
            Question: 'Method Overriding is an example of',
            Answers: ['Static Binding', 'Dynamic Binding', 'Data Binding','None of the above'],
            correct: 'Dynamic Binding'
        }
    },
    {
        questions: {
            Question: 'Which of the following is not a builtin datatype?',
            Answers: ['long', 'double', 'The Sinking of the Lusitania / 1918', 'string', 'char'],
            correct: 'string'
        }
    },
    {
        questions: {
            Question: 'Is String[] args mandatory in the definition of main method?',
            Answers: ['Yes', 'No'],
            correct: 'Yes'
        }
    },

];

let points = 0;
let questionNum = 0;
let startingTime = 71;
let counter = startingTime;
let subtractTime = false;
let numberOfQuestions = GameQuestions.length;
let highScore = []

function startGame() {
    console.log('Game started');
    let mystart = document.getElementById('start');
    mystart.remove();
    createQuestion(GameQuestions);
    startTimer();

}

function endGame() {
    console.log('game has ended')
    questionNum = 0;
    counter = 0;

    let timer = document.getElementById('timer');
    timer.innerHTML = `${counter}`;

    let divInitials = document.createElement('div');
    divInitials.setAttribute('id', 'initial-holder');

    let h1 = document.createElement('h1');
    h1.innerHTML = 'All Done!!';

    let para = document.createElement('p');
    para.innerHTML = `Your final score is ${points}`;

    let textInput = document.createElement('input');
    textInput.setAttribute('type', 'text');
    textInput.setAttribute('id', 'initials');
    textInput.setAttribute('name', 'initials');

    let node = document.createTextNode("Enter Initials: ");
    let spanTag = document.createElement('span');
    spanTag.innerHTML = 'Enter Initials: ';

    let submitBtn = document.createElement('button');
    submitBtn.innerHTML = 'Submit';
    submitBtn.addEventListener('click', createInitials);

    let questionHolder = document.getElementById('questions-holder');
    questionHolder.appendChild(divInitials);

    divInitials.appendChild(h1);
    divInitials.appendChild(para);
    divInitials.appendChild(spanTag);
    divInitials.appendChild(textInput);
    divInitials.appendChild(submitBtn);

}

function createInitials() {
    let textOut = document.getElementById('initials')
    console.log(textOut.value);
    let currentPoints = points;
    points = 0;
    highScore.push(
        {
            player: {
                initials: textOut.value,
                score: currentPoints
            }
        }
    )

    let divHighScore = document.createElement('div');
    divHighScore.setAttribute('id','highscore-holder');

    let h1 = document.createElement('h1');
    h1.innerHTML = 'High Scores';

    let ul = document.createElement('ul');
    ul.setAttribute('id', 'ul-highscore');

    console.log(highScore);

    if (highScore !== null) {
        highScore.map((item, idx) => {
            let li = document.createElement('li');
            let num = idx + 1;
            li.innerHTML = `${num}. ${item.player.initials} - ${item.player.score}`;
            ul.appendChild(li);
         })
    }

    let goBackBtn = document.createElement('button');
    goBackBtn.addEventListener('click', goBackLisenter); 
    goBackBtn.innerHTML = 'Go Back';

    let clearScore = document.createElement('button');
    clearScore.addEventListener('click', clearScoreListener);
    clearScore.innerHTML = 'Clear High Score';

   document.getElementById('initial-holder').remove();
    divHighScore.appendChild(h1);
    divHighScore.appendChild(ul);
    divHighScore.appendChild(goBackBtn);
    divHighScore.appendChild(clearScore);
    document.getElementById('holder').appendChild(divHighScore);
}

function answerListener(event) {
    console.log(event.target.innerHTML)
    console.log(event.target.getAttribute('data-answ'));

    let myquesId = document.getElementById('question');
    let myhorRule = document.createElement('hr');
    let newEle = document.createElement('h5');

    if (event.target.getAttribute('data-answ') === '1') {
        points = points + 10;
        console.log("Total points so far: ", points);
        newEle.setAttribute('class', 'spacing');
        newEle.innerHTML = 'Correct Answer';
        myquesId.appendChild(newEle);
        myquesId.appendChild(myhorRule);
    } else {
        newEle.setAttribute('class', 'spacing');
        newEle.innerHTML = 'Incorrect Answer';
        myquesId.appendChild(newEle);
        myquesId.appendChild(myhorRule);
        subtractTime = true;
    }
    setTimeout(() => {
        removeQuestion();
        createQuestion(GameQuestions);
     }, 1000)
    
}

function createQuestion(myarr) {
    ++questionNum;
    if (questionNum > numberOfQuestions) {
        endGame();
        return 1;
    }
    console.log(questionNum);
    let currentQuestion = myarr[questionNum -1];

    console.log(currentQuestion);

        let myDiv = document.createElement('div');
        myDiv.setAttribute('id', 'question');
        let myP = document.createElement('p');
    myP.innerHTML = currentQuestion.questions.Question;
    myDiv.appendChild(myP);

    currentQuestion.questions.Answers.map((item) => {
        let quesButton = document.createElement('button');

        if (item === currentQuestion.questions.correct) {
            quesButton.setAttribute('data-answ', '1');
        } else { quesButton.setAttribute('data-answ', '0'); }

        quesButton.addEventListener('click', answerListener)
        quesButton.innerHTML = item;
        myDiv.appendChild(quesButton)
     })


    let questionHolder = document.getElementById('questions-holder');
    questionHolder.appendChild(myDiv);
     
}

function startTimer() { 
    var interval = setInterval(function () {
        counter--;

        let timer = document.getElementById('timer');

        if (subtractTime) {
            counter = counter - 5;
            subtractTime = false;
        }

        // Display 'counter' wherever you want to display it.
        if (counter <= 0) {
            clearInterval(interval);
            counter = startingTime;
            removeQuestion();
            endGame();
            
            return;
        } else {
            timer.innerHTML = `Time: ${counter}`;
            console.log("Timer --> " + counter);
        }
    }, 1000);

}

function removeQuestion() {
    let myquestionId = document.getElementById('question');
    myquestionId.remove()
}

function goBackLisenter() {
    
    let startDiv = document.createElement('div');
    startDiv.setAttribute('id', 'start');

    let h1 = document.createElement('h1')
    h1.innerHTML = 'College Quiz';
    
    let para = document.createElement('p')
    para.innerHTML = 'Intructions to Game';

    let btn = document.createElement('button')
    btn.addEventListener('click', startGame);
    btn.innerHTML = 'Start Quiz';

    startDiv.appendChild(h1);
    startDiv.appendChild(para);
    startDiv.appendChild(btn);

    let gameHolder = document.getElementById('questions-holder');
    gameHolder.appendChild(startDiv);
    document.getElementById('highscore-holder').remove();
}

function clearScoreListener() {
    highScore.length = 0;
    document.getElementById('ul-highscore').remove();
}
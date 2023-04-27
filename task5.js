const questions= [{
    question: "Which language runs in a web browser?", Answers: [
        { text: "Java", correct: false},
        { text: "C", correct: false},
        { text: "Python", correct: false},
        { text: "JavaScript", correct: true}]
},

{
    question: "What is the full form of html ?", Answers: [
        { text: "hyper team trans lan", correct: false},
        { text: "hooper text typical language", correct: false},
        { text: "hypet text transfer protocol", correct: false},
        { text: "Hyper Text Transfer Language", correct: true}]
},

{
    question: "What is the full-form of css?", Answers: [
        { text: "cascading styling sheeting", correct: false},
        { text: "cascading stylon shalon", correct: false},
        { text: "cascading style shoot", correct: false},
        { text: "cascading style sheet", correct: true}]
},

{
    question: "What is the full-form of DOM?", Answers: [
        { text: "document object manipulation", correct: false},
        { text: "document operation model", correct: false},
        { text: "document object moan", correct: false},
        { text: "document object model", correct: true}]
},
]

const questionE = document.getElementById('question');
let answerbuttons= document.getElementById('answer-btns');
const nextbutton= document.getElementById('next-btn');
const timeLeft = document.querySelector('.time-left');

let currentquestionindex=0;
 let score=0;
 let count=10;
 var countdown;

 //initial stage
 function startquiz(){
    currentquestionindex=0;
    score=0;
    count=10;  
    nextbutton.innerHTML='Next';
    // clearInterval(countdown);
    timerDisplay();
    showQuestion();
    
 }

 //set timer function
 const timerDisplay=()=>{
    count=11;
    countdown=setInterval(()=>{
        count--;
        timeLeft.innerHTML=`${count}s`;  
        if(count == 0){
            clearInterval(countdown);
          handlenextbutton();
        } 
    },1000);
};

//show questions
function showQuestion() {
    reset();
    let currentquestion = questions[currentquestionindex];
    let questionNo=currentquestionindex+1;
    questionE.innerHTML=questionNo+"."+currentquestion.question;

    currentquestion.Answers.forEach(answer=>{
        const button = document.createElement('button');
        button.innerHTML=answer.text;
        button.classList.add('btn');
        answerbuttons.appendChild(button);
        if(answer.correct){
            button.dataset.correct= answer.correct;
        }
        button.addEventListener('click',select);
    });
   
}

//remove the unwanted buttons 
function reset(){
    nextbutton.style.display='none';
    while(answerbuttons.firstChild){
    answerbuttons.removeChild(answerbuttons.firstChild);}
    }

//selected button is correct or wrong
function select(e){
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === 'true';
    if(iscorrect){
        selectedbtn.classList.add('green');
        score++;
    }
    else{
        selectedbtn.classList.add('red');
    }
    Array.from(answerbuttons.children).forEach(button =>{
        if(button.dataset.correct === 'true'){
            button.classList.add('green');
        }
        // clearInterval(countdown);
        button.disabled=true;
    });
    nextbutton.style.display='block';
   
}

//scoring
function showScore(){
    reset();
    questionE.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextbutton.innerHTML='Play Again';
    nextbutton.style.display='block';
    clearInterval(countdown);
    timeLeft.innerHTML='0';
}

//nextquestion logic
function handlenextbutton(){
currentquestionindex++;
if(currentquestionindex < questions.length){
    showQuestion();
    timerDisplay();
}
else{
    showScore();
}
}

//logic to start anew or next nextquestion
 const a= nextbutton.addEventListener('click',()=>{
   
    if(currentquestionindex < questions.length){
    clearInterval(countdown);
    handlenextbutton();
    }
    else{
        startquiz();
       
    }
})

//parent node calling
startquiz();







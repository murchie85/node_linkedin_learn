/*
Logic to creating this job is


*/

const readline =require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const questions = [
    "what is your name? ",
    "Where do you live? ",
    "What are you going to do with NodeJs? "
];

// These parms get passed in
// questions parm
// done function (thats executed at the end)
const collectAnswers = function (questions, done) {
    const answers = [];
    const[firstquestion] = questions;
    
    const questionAnswered = function (answer) {
        answers.push(answer);
        if(answers.length < questions.length){
            // recursive
            rl.question(questions[answers.length], questionAnswered);
        }
        else{
            done(answers)
        }
    };
    
    rl.question(firstquestion, questionAnswered);
};

// call function, but second is always an end function (using the returned parm)


const printAnswers = function (answers) {
    console.log("Thanks for your answers");
    console.log(answers);
    process.exit();
};


collectAnswers(questions,printAnswers );
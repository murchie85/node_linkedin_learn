const readline =require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


module.exports = function(questions, done = f => f) {
    const answers = [];
    const[firstquestion] = questions;
    
    const questionAnswered = function (answer) {
        answers.push(answer);
        if(answers.length < questions.length){
            rl.question(questions[answers.length], questionAnswered);
        }
        else{
            done(answers)
        }
    };
    
    rl.question(firstquestion, questionAnswered);
};
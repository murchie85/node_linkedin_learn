
const collectAnswers =require("./lib8/collectAnswers8");


const questions = [
    "what is your name? ",
    "Where do you live? ",
    "What are you going to do with NodeJs? "
];

const printAnswers = function (answers) {
    console.log("Thanks for your answers");
    console.log(answers);
    process.exit();
};


collectAnswers(questions,printAnswers );
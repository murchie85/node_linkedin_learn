
const collectAnswers =require("./lib8/collectAnswersEventEmitter9");


const questions = [
    "what is your name? ",
    "Where do you live? ",
    "What are you going to do with NodeJs? "
];

const printAnswers = function (answers) {
    console.log("Thanks for your answers");
    console.log(answers);
};


const answerEvents = collectAnswers(questions,printAnswers );

// listener event 
answerEvents.on("answer", answer=>console.log(`quesion answered: ${answer}`));
// defined in emitter
answerEvents.on("complete", ()=>process.exit());
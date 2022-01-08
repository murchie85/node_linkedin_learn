const questions = [
        'what is your name?',
        'what would you rather be doing?',
        'What is your preferred programming language?'
];

const ask = (i=0) => {
    process.stdout.write(`\n\n\n ${questions[i]}`);
    process.stdout.write(' > '); 
};


ask();


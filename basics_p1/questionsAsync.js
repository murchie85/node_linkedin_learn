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

// On function listens to events
// 'data' listens for data event (if we type on keyboard and press enter)
// second arg is hte handler func, we will echo back
// Data is passsed as binary, so we convert `toString`

const answers = [];

// pushes captured input to answers array 
process.stdin.on('data', data => {
    answers.push(data.toString().trim())

    if (answers.length < questions.length){
        ask(answers.length); // increments 
    }
    else{
        // all answered 
        process.exit()
    }

});


process.on('exit', () =>{

    const [name,activity,lang] = answers;
    console.log(`

    Thank you for your answers

    Go  ${activity} ${name} you can write ${lang} code later!.
    
    `)

});
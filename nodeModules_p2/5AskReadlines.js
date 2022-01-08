// Its a readable/writable module
const readline = require("readline");

//interface required to work with readline 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// we can use the readline question method
// first arg: prompt question
// second arg: callback function , takes answer as parm
rl.question("How do you like node? ", answer =>{
    console.log(`Your answer ${answer}`);
    process.exit()
})
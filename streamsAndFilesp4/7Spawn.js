const cp = require('child_process');

// command, followed by args (as array)
const questionApp = cp.spawn("node",['questions.js']);

// PASS INPUT
// we can do this cus its  a strea 
questionApp.stdin.write('Adam \n')
questionApp.stdin.write('dundee \n')
questionApp.stdin.write('build stuff \n')

// capture any data event
questionApp.stdout.on('data', dataEvent=>{
    console.log(`from the question app: ${dataEvent}`);
})

// capture close event
questionApp.on('close',() =>{
    console.log(`question app proc terminated`)
});
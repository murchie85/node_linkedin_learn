const cp  = require('child_process');

// execute command is for syncronous commands
// they run then they finish 
var testme = false;
if(testme){
    cp.exec('Open http://www.linkedin.com/learning');
    cp.exec('open -a Terminal .')
}


cp.exec('lst',(err,data,stderr)=>{
    if(err){
        console.log(stderr)
        throw err
    }
    console.log(data)
})

// show the error
// note dont throw 
cp.exec('lst',(err,data,stderr)=>{
    console.log(stderr)
});
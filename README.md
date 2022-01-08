# Node Tutorials and Notes

# BASICS

- Importing
- Template string
    - Pluck file name from full path
- Global 
- Let
- Processes 
    - Pid, parent,
    - argv returned to array of variables
- Get calling Arguments
- Arguments with Flags and function
- Stdin (getting input)
- stdin with asyncrhonous listen (getting input)
- Push
- handing exit, populating array. 


## Importing 

Use require 

`require("MyPackage")`

Example: 

`const path  = require("path");`

## Template string 
  
- It also honours white space if you add it in 


```js
let bah = 'banana';
console.log(`my fruit is ${bah}`);
```

```js
const text = ` first line 
second line 
`;
console.log(text);
```



### Pluck file name from full path
```js
console.log(`The file name is ${path.basename(__filename)}`);
```


## Global

Preloaded libraries `console.log` is actually `global.console.log`
Includes:  

```js
_dirname, _filename, module,process,URL,reuqire(),exports, ...
```

`console.log(__dirname);`                                       This gives dir name 
`console.log(__filename);`                                      this gives dirname plus file name, full path
`console.log(`The file name is ${path.basename(__filename)}`);` This gives only last file name 

## Let 

Like var but can't be redefined 

```node
let hello = 'hello world';
```


## Processes 

`console.log(process.pid);`   get pid
`console.log(process.versions.node);` Get current version of node js running the process
We can get env variables, communicate with terminal using stdin stdout, 

### Get calling Arguments ( argvs as array )

`console.log(process.argv);`  

Returns 

```js
[
  '/usr/local/Cellar/node/15.12.0/bin/node',
  '/Users/adammcmurchie/Nodejs_apps/linkedin/excercises/globalProcess.js'
]
```
First is the command that run this 
second is path to current module 

## Arrays with process.arv

```js
// inject argv into variables  in array 
const [,, firstName, lastName] = process.argv;
console.log(`Your name is ${firstName} ${lastName}`);
```

returns : 

``` js
Your name is adam mcmurchie
```

##  Arguments with Flags and function

```js
// find index of --user/greeting and get value after it 
const grab = flag =>{
    let indexAfterFlag = process.argv.indexOf(flag) + 1;
    return process.argv[indexAfterFlag];
};

const greeting = grab("--greeting");
const user = grab("--user");

console.log(`${greeting} ${user}`)
```



# stdout 

stdin and stdout allows us to communicate with the process whilst its running. 

For now  we can use it to read/write data to terminal


**process.stdout** is a writable stream 

```js
process.stdout.write("hello ");
process.stdout.write("Worlds \n\n\n ");
```  
  
This is like `console.log()` but gives us more command over the terminal display.  
(note two calls keep it on one line unless i use \n))


# stdout with function

create questions array 
create ask function 
note stdout.write affects terminal, we control new lines 

```js
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
```


Note that it exits at the end = this is because it runs `synchronously` 

# stdin with asyncrhonous listen

**Adding** this code to the above 

```js
// On function listens to events
// 'data' listens for data event (if we type on keyboard and press enter)
// second arg is hte handler func, we will echo back
// Data is passsed as binary, so we convert `toString`
process.stdin.on('data', data => {
    process.stdout.write(`\n\n ${data.toString().trim()} \n\n`)
    process.exit();
});
```


# Push 

Improving on the above, we can create an answers array.
Push to it on keyboard event (our typed answer)

Then recall ask function with `answers.length ` which is always index+1

exit at end 

```js
const answers = [];

process.stdin.on('data', data => {
    // pushes captured input to answers array 
    answers.push(data.toString().trim())

    if (answers.length < questions.length){
        ask(answers.length); // increments 
    }
    else{
        // all answered 
        process.exit()
    }

});
```



#  handing exit, populating array. 

```js
process.on('exit', () =>{

    const [name,activity,lang] = answers;
    console.log(`

    Thank you for your answers

    Go  ${activity} ${name} you can write ${lang} code later!.
    
    `)

});
```


# Modules 

- Path usage
- heap statistics and logging
- Readlines stdin/stdout
- Readlines direct
- Export and import 
- Function default Null

## Path usage
```js
const path = require("path");
// contents are child directories
const dirUploads = path.join(__dirname,'www','files','uploads');
```

## heap statistics and logging

```js
const path = require("path");
const util = require("util");
const v8   = require("v8");


util.log(path.basename(__filename));
util.log( " ^ The name of the current file. ");

util.log(v8.getHeapStatistics());
```

# Readlines stdin/stdout

```js
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
})
```



## Export and import 

```js
// File A
module.exports = "Alex";

// File B
const name = require("./mymodule_7");
```

Then we can use it in File B as normal i.e. 

```js
// FILE A
console.log(name);
```

More sophisticated version:  
  
```js
//File A

const inc = () => ++count;
const dec = () => ++count;
const getCount = () => count;

module.exports = {
    inc,
    dec,
    getCount
};

//FIle B 

const counter = require("./mymodule_7");

counter.inc()
counter.inc()
counter.inc()

console.log(counter.getCount());

// output = 4
```

## Function default Null

In short, we make our done function parm = `f=>f`
 
```js

 const collectAnswers = function(questions, done = f => f) {
    const answers = [];
    ...
};
```


 Take this function again: 

 ```js
 const collectAnswers = function (questions, done) {
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
```

we are meant to call it using a `function as second parm` like so.   

```js 
collectAnswers(questions,Answers=>{
    console.log("Thankyou for your answers");
})
```

If we call it without a second parm 

```js
collectAnswers(questions)
```

we get an error `done is not a function`, because we didn't pass it answers function. 

So lets make Done a default arguments: 

```js

 const collectAnswers = function(questions, done = f => f) {
    const answers = [];
    ...
};
```

## EventEmitter 

Powerful tool 

- NodeJs implementation of **pub/sub** selfhelp design pattern
- For publishing and subscribing
- Gives us a mechanism for `emitting cusom events` 
- and wiring up listeners and handlers.


```js
const events = require("events");
// CONSTRUCT
const emitter  = new events.EventEmitter();
// HANDLE
emitter.on("CustomEvent", (message,user)=>{
    console.log(`${user}:${message}`);
});
// IMPLEMENT 1. name, 2.parm, 3.parm
emitter.emit("CustomEvent", "Hello world", "Computer");
emitter.emit("CustomEvent", "This event is raised when we want", "Adam")
emitter.emit("CustomEvent", "Please input your message, press exit to exit", "Adam")

// IMPLEMENT async usage
process.stdin.on('data',data=>{
    const input = data.toString().trim();
    if(input ==="exit"){
        emitter.emit("CustomEvent",'goodbye','process')
        process.exit()
    }
    emitter.emit("CustomEvent", input, "terminal");
})
```


## Set timeout function

`timers.js`

```js
// set time 
const waitTime = 3000;

// print
console.log.(` setting a ${waitTime / 1000} second delay`);

// print done func
const timerFinished = () => console.log("done");

// (first arg is the function you invoke on completion)
setTimeout(timerFinished, waitTime);


```

## set interval   
  
its a special function that runs a function `parm a` every interval `parm b`
```js
// set interval to intermittently report
const waitTime = 3000;
const waitInterval = 500;
let currentTIme = 0;

// increments current time 
const incTime = () => {
    currentTIme +=waitInterval;
    console.log(`waiting ${currentTIme/1000} seconds`);
};

// logs wait time
console.log(`Setting a  ${waitTime/1000} wait time. `);

// logs output
const timerComplete = () => { 
    clearInterval(interval)
    console.log('Done!');}

// returned interval is a special object
const interval = setInterval(incTime,waitInterval);

// calls timerComplete once waitTime reached
setTimeout(timerComplete,waitTime);
```


# terminal clearline and stay on same line

```js
const incTime = () => {
    currentTIme +=waitInterval;
    // percentage
    const p = Math.floor((currentTIme/waitTime)*100);

    process.stdout.clearLine();// removes last line from terminal
    process.stdout.cursorTo(0); // moves cursor to start of line 
    process.stdout.write(`waiting ... ${p} %`);
};

// logs wait time
console.log(`Setting a  ${waitTime/1000} wait time. `);

// logs output
const timerComplete = () => { 
    clearInterval(interval)
    process.stdout.clearLine(); // clear
    process.stdout.cursorTo(0); // stay on same line
    console.log('Done!');}


// calls periodically each weaitinterval
const interval = setInterval(incTime,waitInterval);

// calls once, when time is reached
setTimeout(timerComplete,waitTime);


```


# File system 

Note file operations here may not be as useful as the `filestream` options, more native to node. 

- json 
    - Reading Json files
    - Accessing VALUES
    - Looping list values in json
- readdir
    - readdir
    - readdirsync
    - readdir throw error
    - Asynch notes
- Read Files
    - readFileSync
    - array slicing
    - reading
- Write file
- Create dir
- check dir exists
- append files
- rename
- move file
- delete file
- directories
    - rename/move directories
    - delete empty directory
    - delete full directory
    - Clone all contents 




# json 

## Reading Json files

Use `require` instead because you preserve the json object  
```js
const myJsonObj = require('pathtoFile');
```

## Accessing VALUES

SPECIFY THE KEY 
```js
const colorData = require('./assets/colors.json');
console.log(colorData.colorList);
// Will return a list 
```

## Looping list values in json

```js
colorData.colorList.forEach(c=>{
    console.log(c)
});
```

  

# readdir

## readdir

Executed `asyncronously` i.e. non-blocking 

```js
fs.readdir('./assets',(err,files)=>{
    console.log(files);
})
```

## readdirSync

Executed `syncronously` i.e. blocking 

```js
const fs = require("fs");
// Readfiles
const files  = fs.readdirSync('./assets');
console.log(files);
```  
## readdir throw error

Executed `asyncronously` i.e. non-blocking 

```js
fs.readdir('./assets',(err,files)=>{
    if(err){
        throw(err)
    }
    console.log(files);
})
```

# Asynch notes

```js
fs.readdir('./assets',(err,files)=>{
        if(err){
            throw(err)
        }
    console.log(files);
    console.log("Complete");

})

console.log('I should actually come last,\n but I dont because the callback function runs asyncronously waiting for files to be read (non-blocking).\n But the proceeding lines can continue')
```

# Read Files


## readFileSync

`blocking`

```js
const fs = require('fs');

const text = fs.readFileSync('./assets/Readme.md','UTF-8');
console.log(text);
```

# array slicing

```js
fs.readFile('./assets/Readme.md','UTF-8',(err,text)=>{
    console.log('File contents read: ');
    console.log(text.slice(-10));
});
```


## reading

- Dont define filetype 

```js
fs.readFile('./assets/pikachu.jpg',(err,img)=>{
    console.log('File contents read: ');
    console.log(img.slice(-10));
});
```


# Write file

```js
const fs = require('fs');
const outputText = 'blah'

fs.writeFile('./assets/notes.md',outputText.trim(),(err)=>{
    if(err){throw err;}
    console.log('File saved. ')
});

```

# create dir
  
```js
const fs = require('fs');

fs.mkdir('storage-files',err =>{
    if(err){throw err;}
    console.log('Dir created')
});
```

## check dir exists
  
There might be async version too  

```js
if(fs.existsSync('storage-files')){
    console.log('dir already exists')
}else{
``` 
## append files

parms 

- targetdir (create if not exist)
- value

```js
fs.appendFile('./storage-files/colors.md',`${c.name}:${c.hex} \n`);
```

## rename 

```js
fs.renameSync('./assets/apple.txt','./assets/banana.txt');
```

## move file

do this using rename function 

```js
fs.rename('./assets/banana.txt', './storage-files/banana.txt',err=>{
    if(err){
        console.log('rename failed');
        throw err;
    }
});

```

## delete file 

```js
fs.unlinkSync("./assets/banana.txt");
```

# Directories



## rename/move directories  

```js
fs.renameSync('./storage-files','./storage');
```

## delete empty directory
  

```js
fs.rmdirSync('./testdir');
```
- None blocking  

```js
fs.rmdir('./testdir',err=>{
    if(err){throw err;}
});
```

## delete full directory

```js
const fs = require('fs');
// loop each file 
fs.readdirSync('./fullFolder').forEach(fileName =>{
    fs.unlinkSync(`./storage/${fileName}`);
})

// now we can remove the empty dir
fs.rmdirSync('./fullFolder');

```
### dir manipulation using timeout

```js

fs.mkdirSync('./testdir')

setTimeout(()=>{
    fs.rmdir('./testdir',err=>{
        if(err){
            throw err;
        }
        console.log('Removed');
    });
},2000);


```



### Clone all contents 

```js
const fs = require('fs');
// define source and detination
sourceFolder = './assets'
folderName   = './myDemoFolder'

// make dir if not exists
if(fs.existsSync(folderName)){
    console.log('folder exists')
}else{
    fs.mkdirSync(folderName)
    console.log('folder created')
}

// for each item in dir
// if not a folder(starting with .)
// copy
fs.readdirSync(sourceFolder).forEach(fileName=>{
    //console.log(`${sourceFolder}/${fileName}`);
    if(fileName.slice(0,1) !='.'){
        fs.copyFileSync(`${sourceFolder}/${fileName}`,`${folderName}/${fileName}`);
        console.log(`${fileName} copied`)
    }

});
```



# Streams
 
**Streams are used constantly**

Stream interface allows us to read/write data to files, communicate to internet and communicate with processes. 

Stream allows to read memory into a buffer bit by bit 

Events are: 

- on
    - on('data')
    - on('end')
- once


contents 

- Read file stream 
- write File stream 
- readstream to write stream (copy)
- pipe realtime read
- pipe readstream to write stream (copy)

- child proc mocules

**execute node modules without terminal**


## Read input stream 

`process.stdin` is a readable stream, we read it by listening to data events with the `stdin.on` method.

```js
const fs = require('fs');
process.stdin.on('data', data=>{
    console.log(`I read ${data.length -1} characters of text`)
    process.exit()
});
```

## Read file stream 

we just add the `on` to the readStream. 

```js
const readStream  = fs.createReadStream('./assets/Readme.md','UTF-8');

readStream.on('data', data=>{
    console.log(`I read ${data.length -1} characters of text`)
});
```


## extract all data from stream 

```js
let fileText = "";
readStream.on('data', data=>{
    fileText += data; // Extract all the data from stream 
});
```

## write File stream 

```js
const fs = require('fs');

const writeStream = fs.createWriteStream('./assets/myFile.txt','UTF-8');
writeStream.write('Hello ');
writeStream.write('world \n');   
```

## write File stream from user input

```js
const fs = require('fs');

const writeStream = fs.createWriteStream('./assets/myFile.txt','UTF-8');
process.stdin.on('data',data=>{
    writeStream.write(data);
});
```

## readstream to write stream 

basically a copy 

```js
const fs = require('fs');

const writeStream = fs.createWriteStream('./assets/myFile.txt','UTF-8');
const readStream  = fs.createReadStream('./assets/Readme.md','UTF-8');


// write from user input
readStream.on('data',data=>{
    writeStream.write(data);
});
```


## pipe realtime read
```js
process.stdin.pipe(writeStream)
```

# pipe readstream to write stream (copy)

```js
readStream.pipe(writeStream)
```


## child proc module 

**execute node modules without terminal**

child proc module allows you to execute external processes in your environment. 

Your node js app can run and communicate with other apps in same env 

`spawn` and `execute` are the two methods to create child procs


## exec 

open a web page 

```js
cp.exec('Open http://www.linkedin.com/learning');
```

## exec terminal commands

```js
cp.exec('ls',(err,data)=>{if(err){throw err}})
```

## exec node script

```js
const cp  = require('child_process');

cp.exec('node 2ReadFileStream',(err,data,stderr)=>{
    console.log(data)
});
```


## spawn child procs

`exec` runs sync, they run and close 

however `exec`  isn't meant to handle  `async` processes, such as:

- long processes
- processes waiting for input
- or anything that remains open

say for example the `questions.js` program that gets input from user.   
  
That remains open until all inputs gathered, so we would not want to run `exec` on this process.   
  
we would want to spawn it.  
  
```js
const cp = require('child_process');
// command, followed by args (as array)
const questionApp = cp.spawn("node",['questions.js']);
```  

but we need to listen for event after spawn.  

```js
const cp = require('child_process');
const questionApp = cp.spawn("node",['questions.js']);

questionApp.stdout.on('data', dataEvent=>{
    console.log(`from the question app: ${dataEvent}`);
})
```
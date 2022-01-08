

# List of items 

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
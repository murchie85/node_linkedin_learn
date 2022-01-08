# Contents 

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
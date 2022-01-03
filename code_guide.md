

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
- Stdin
- stdout

## Importing 

Use require 

`require("MyPackage")`

Example: 

`const path  = require("path");`

## Template string 

```
let bah = 'banana';
console.log(`my fruit is ${bah}`);
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



# stdin 

stdin and stdout allows us to communicate with the process whilst its running. 

For now  we can use it to read/write data to terminal


**process.stdout** is a writable stream 

```js
process.stdout.write("hello ");
process.stdout.write("Worlds \n\n\n ");
```  
  
This is like `console.log()` but gives us more command over the terminal display.  


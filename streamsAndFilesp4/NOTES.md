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
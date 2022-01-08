const fs = require('fs');

// can also do binary stream 
const readStream  = fs.createReadStream('./assets/Readme.md','UTF-8');

// collect
let fileText = "";

// read data len 
readStream.on('data', data=>{
    console.log(`I read ${data.length -1} characters of text`)
    
    // Extract all the data from stream 
    fileText += data;
});

// read only once
// hence get
readStream.once('data', data=>{
    console.log(data);
});


readStream.on('end',()=>{
    console.log('finished');
    console.log(`Total read is ${fileText.length-1} characters of text`)
});
const fs = require('fs');

// blocking
const text = fs.readFileSync('./assets/Readme.md','UTF-8');
console.log(text.slice(0,10));
console.log('Done \n');

// nonblocking
fs.readFile('./assets/Readme.md','UTF-8',(err,text)=>{
    console.log('File contents read: ');
    console.log(text.slice(-10));
});

// readimg
fs.readFile('./assets/pikachu.jpg',(err,img)=>{
    console.log('File contents read: ');
    console.log(img.slice(-10));
});
const fs = require('fs');

const writeStream = fs.createWriteStream('./assets/myFile.txt','UTF-8');

// Write directly
writeStream.write('Hello ');
writeStream.write('world \n');   

// write from user input
process.stdin.on('data',data=>{
    writeStream.write(data);
});
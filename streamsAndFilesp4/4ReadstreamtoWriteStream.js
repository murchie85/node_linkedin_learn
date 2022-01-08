const fs = require('fs');

const writeStream = fs.createWriteStream('./assets/myFile.txt','UTF-8');
const readStream  = fs.createReadStream('./assets/Readme.md','UTF-8');

/*
// write from user input
readStream.on('data',data=>{
    writeStream.write(data);
});
*/

// realtime read
//process.stdin.pipe(writeStream)

readStream.pipe(writeStream)
const fs = require('fs');

process.stdin.on('data', data=>{
    console.log(`I read ${data.length -1} characters of text`)
    process.exit()
});
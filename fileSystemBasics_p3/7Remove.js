const fs = require('fs');

// delete file
setTimeout(()=>{
    fs.unlinkSync("./assets/banana.txt");
},4000);
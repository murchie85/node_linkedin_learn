const fs = require('fs');


fs.mkdirSync('./demoDir');

// delete after 2 seconds
setTimeout(()=>{
    fs.rmdir('./demoDir',err=>{
        if(err){
            throw err;
        }
        console.log('Removed');
    });
},2000);

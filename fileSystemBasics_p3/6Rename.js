const fs = require('fs');

// blocking
//fs.renameSync('./assets/apple.txt','./assets/banana.txt'); 

fs.rename('./assets/banana.txt', './storage-files/banana.txt',err=>{
    if(err){
        console.log('rename failed');
        throw err;
    }
});

const fs = require("fs");

// blocking
//const files  = fs.readdirSync('./assets');
//console.log(files);

// non blocking

fs.readdir('./assets',(err,files)=>{
        if(err){
            throw(err)
        }
    console.log(files);
    console.log("Complete");

})

console.log('I should actually come last,\n but I dont because the callback function runs asyncronously waiting for files to be read (non-blocking).\n But the proceeding lines can continue')
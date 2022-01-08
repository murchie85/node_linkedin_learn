const fs = require('fs');
fs.readdirSync('./fullFolder').forEach(fileName =>{
    fs.unlinkSync(`./fullFolder/${fileName}`);
})
fs.rmdirSync('./fullFolder');
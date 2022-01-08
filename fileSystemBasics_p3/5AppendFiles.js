const fs = require('fs');
const colorData = require('./assets/colors.json');

colorData.colorList.forEach(c=>{
    // Creates file if not exist
    fs.appendFile('./storage-files/colors.md',`${c.color}:${c.hex} \n`,err=>{
        if(err){ throw err }
    });
});
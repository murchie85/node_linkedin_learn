const fs = require('fs');

const outputText = 'blah'

fs.writeFile('./assets/notes.md',outputText.trim(),(err)=>{
    if(err){throw err;}
    console.log('File saved. ')
});

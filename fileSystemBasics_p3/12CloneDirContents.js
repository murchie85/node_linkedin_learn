const fs = require('fs');
folderName   = './myDemoFolder'
sourceFolder = './assets'

if(fs.existsSync(folderName)){
    console.log('folder exists')
}else{
    fs.mkdirSync(folderName)
    console.log('folder created')
}


fs.readdirSync(sourceFolder).forEach(fileName=>{
    //console.log(`${sourceFolder}/${fileName}`);
    if(fileName.slice(0,1) !='.'){
        fs.copyFileSync(`${sourceFolder}/${fileName}`,`${folderName}/${fileName}`);
        console.log(`${fileName} copied`)
    }

});
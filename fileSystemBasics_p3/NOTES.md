# File system 

Note file operations here may not be as useful as the `filestream` options, more native to node. 

- json 
    - Reading Json files
    - Accessing VALUES
    - Looping list values in json
- readdir
    - readdir
    - readdirsync
    - readdir throw error
    - Asynch notes
- Read Files
    - readFileSync
    - array slicing
    - reading
- Write file
- Create dir
- check dir exists
- append files
- rename
- move file
- delete file
- directories
    - rename/move directories
    - delete empty directory
    - delete full directory
    - Clone all contents 




# json 

## Reading Json files

Use `require` instead because you preserve the json object  
```js
const myJsonObj = require('pathtoFile');
```

## Accessing VALUES

SPECIFY THE KEY 
```js
const colorData = require('./assets/colors.json');
console.log(colorData.colorList);
// Will return a list 
```

## Looping list values in json

```js
colorData.colorList.forEach(c=>{
    console.log(c)
});
```

  

# readdir

## readdir

Executed `asyncronously` i.e. non-blocking 

```js
fs.readdir('./assets',(err,files)=>{
    console.log(files);
})
```

## readdirSync

Executed `syncronously` i.e. blocking 

```js
const fs = require("fs");
// Readfiles
const files  = fs.readdirSync('./assets');
console.log(files);
```  
## readdir throw error

Executed `asyncronously` i.e. non-blocking 

```js
fs.readdir('./assets',(err,files)=>{
    if(err){
        throw(err)
    }
    console.log(files);
})
```

# Asynch notes

```js
fs.readdir('./assets',(err,files)=>{
        if(err){
            throw(err)
        }
    console.log(files);
    console.log("Complete");

})

console.log('I should actually come last,\n but I dont because the callback function runs asyncronously waiting for files to be read (non-blocking).\n But the proceeding lines can continue')
```

# Read Files


## readFileSync

`blocking`

```js
const fs = require('fs');

const text = fs.readFileSync('./assets/Readme.md','UTF-8');
console.log(text);
```

# array slicing

```js
fs.readFile('./assets/Readme.md','UTF-8',(err,text)=>{
    console.log('File contents read: ');
    console.log(text.slice(-10));
});
```


## reading

- Dont define filetype 

```js
fs.readFile('./assets/pikachu.jpg',(err,img)=>{
    console.log('File contents read: ');
    console.log(img.slice(-10));
});
```


# Write file

```js
const fs = require('fs');
const outputText = 'blah'

fs.writeFile('./assets/notes.md',outputText.trim(),(err)=>{
    if(err){throw err;}
    console.log('File saved. ')
});

```

# create dir
  
```js
const fs = require('fs');

fs.mkdir('storage-files',err =>{
    if(err){throw err;}
    console.log('Dir created')
});
```

## check dir exists
  
There might be async version too  

```js
if(fs.existsSync('storage-files')){
    console.log('dir already exists')
}else{
``` 
## append files

parms 

- targetdir (create if not exist)
- value

```js
fs.appendFile('./storage-files/colors.md',`${c.name}:${c.hex} \n`);
```

## rename 

```js
fs.renameSync('./assets/apple.txt','./assets/banana.txt');
```

## move file

do this using rename function 

```js
fs.rename('./assets/banana.txt', './storage-files/banana.txt',err=>{
    if(err){
        console.log('rename failed');
        throw err;
    }
});

```

## delete file 

```js
fs.unlinkSync("./assets/banana.txt");
```

# Directories



## rename/move directories  

```js
fs.renameSync('./storage-files','./storage');
```

## delete empty directory
  

```js
fs.rmdirSync('./testdir');
```
- None blocking  

```js
fs.rmdir('./testdir',err=>{
    if(err){throw err;}
});
```

## delete full directory

```js
const fs = require('fs');
// loop each file 
fs.readdirSync('./fullFolder').forEach(fileName =>{
    fs.unlinkSync(`./storage/${fileName}`);
})

// now we can remove the empty dir
fs.rmdirSync('./fullFolder');

```
### dir manipulation using timeout

```js

fs.mkdirSync('./testdir')

setTimeout(()=>{
    fs.rmdir('./testdir',err=>{
        if(err){
            throw err;
        }
        console.log('Removed');
    });
},2000);


```



### Clone all contents 

```js
const fs = require('fs');
// define source and detination
sourceFolder = './assets'
folderName   = './myDemoFolder'

// make dir if not exists
if(fs.existsSync(folderName)){
    console.log('folder exists')
}else{
    fs.mkdirSync(folderName)
    console.log('folder created')
}

// for each item in dir
// if not a folder(starting with .)
// copy
fs.readdirSync(sourceFolder).forEach(fileName=>{
    //console.log(`${sourceFolder}/${fileName}`);
    if(fileName.slice(0,1) !='.'){
        fs.copyFileSync(`${sourceFolder}/${fileName}`,`${folderName}/${fileName}`);
        console.log(`${fileName} copied`)
    }

});
```
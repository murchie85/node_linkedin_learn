const cp  = require('child_process');

cp.exec('node 2ReadFileStream',(err,data,stderr)=>{
    console.log(data)
});
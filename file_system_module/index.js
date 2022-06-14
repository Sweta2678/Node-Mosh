const fs  = require('fs');

// const files  = fs.readdirSync('./'); //this is sync method. do not use in node as node is asynchronous in nature.
// console.log(files);

fs.readdir('./',function(err,files){ //callback function - async method call this way
    if(err) console.log('Error',err);
    else console.log('Result',files);
});
//let's treat as main module. 

//load a outside module in this module.

//best practice use const insteadof var, to prevent overriding of var.
//if  const used then we can not override.
const log = require('./logger'); // . for current folder. //if logger.js in parent folder then use ../logger .. 
                    //if logger.js in subfolder then can be use ./subFolder/logger                 

//after module.exports.log = log
// console.log(logger); // { logInfo: [Function: log] }
// log.log('message is sweta');

//after module.exports = log
//now we can directly call the log function without mentioning module name.
log('my modified message after exporting single method module');




// function sayHello(name){
//     console.log('Hello ' + name);
// }

// sayHello('Sweta Khatsuriya');

//Node do not have window or document object.
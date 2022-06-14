const EventEmitter = require('events');

console.log(__filename);
console.log(__dirname);

var url = 'http://mylogger.io/org/';

class Logger extends EventEmitter {
    log(message) { //inside class we do not need function prefix
        //send an HTTP request.
        console.log(message);

        this.emit('messageLogged', {
            id: 1,
            url: 'https://google.com'
        });
    }
}


//export - to make it public
//syntax - module.export.functionName or functionalityName  =  methodName 
//eg. module.export.logsInfo = log

//module.exports.log = log; //it is for the each and every function we want to export

//but if there is only one method and we are exporting then,
module.exports = Logger;

const EventEmitter = require('events'); //EventEmitter is class thats why E is capital.

//to use EventEmitter related methods or memeber we have to create it's instance.

//order matters here -  fisrt have to register listener and then raise an event.
//Register Listener -- 

// emitter.on('messageLogged',function(arg){ //pass defined argument here as arg, e, eventArg .. name doesn't matter
//     console.log('Listener Called',arg);
// })

//ECMA6 , array function

const Logger = require('../first/logger');
const logger  = new Logger();

logger.on('messageLogged',(arg)=>{
    console.log('Listener Called',arg);
})

logger.log('message');


//Raise an event
//emitter.emit('messageLogged',{id:1,url:'https://google.com'}); //to pass argument when event raise. better to send as object..
//emit means making a noice and produce something.. singnalling that event happend.
//before register listener :  no output until this one, coz no listener added. 
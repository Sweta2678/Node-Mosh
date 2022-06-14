const EventEmitter = require('events'); //EventEmitter is class thats why E is capital.

//to use EventEmitter elated methods or memeber we have to create it's instance.
const emitter = new EventEmitter(); //emitter is object. 

//order matters here -  fisrt have to register listener and then raise an event.
//Register Listener -- 

// emitter.on('messageLogged',function(arg){ //pass defined argument here as arg, e, eventArg .. name doesn't matter
//     console.log('Listener Called',arg);
// })

//ECMA6 , array function
emitter.on('messageLogged',(arg)=>{ //pass defined argument here as arg, e, eventArg .. name doesn't matter
    console.log('Listener Called',arg);
})

const log = require('../first/logger');
log('message'); // event doesn't called coz both listener and raise has different objects.


//Raise an event
//emitter.emit('messageLogged',{id:1,url:'https://google.com'}); //to pass argument when event raise. better to send as object..
//emit means making a noice and produce something.. singnalling that event happend.
//before register listener :  no output until this one, coz no listener added. 
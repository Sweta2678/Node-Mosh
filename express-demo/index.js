const Joi = require('joi');
const express = require('express');
const courses = require('./routes/courses');
const home = require('./routes/home');
const logger = require('./middleware/logger');
const authentication = require('./authentication');
const helmet = require('helmet');
const morgan = require('morgan');
//npm rc and config both for configuration
const config = require('config');
//need to set at environement to enable-  export/set DEBUG=app:startup
//to disable - set DEBUG=               //leave it blank after =.
//set multiple - set DEBUG=app:startup,app:db
//to set all debugger - set DEBUG=app:* 

//run application with debug mode in single line -  DEBUG=app:db nodemon index
//const startupDebugger = require('debug')('app:startup');
//const dbDebugger = require('debug')('app:db');
const debug = require('debug')('app:startup');


const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`); //environment variable // we can set environment variable using cmd - set NODE_ENV=production
console.log(`app: ${app.get('env')}`); //environment variable 

app.set('view engine','pug');
app.set('views','./views') // default

app.use(express.json());
app.use(logger);        
app.use(authentication);
app.use(express.urlencoded()); //it is traditional approach. we can pass parasm in post request with the x-www-form-urlencoded in body.
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses',courses);
app.use('/',home);

//console. log(process. env);

//Configuration
//to set environment cmd = set NODE_ENV = production
//to set any env vriable cmd = set app_password = 1234
console.log('Application Name...'+config.get('name'));
console.log('Mail Server...'+config.get('mail.host'));
console.log('Mail password...'+config.get('mail.password'));


if(app.get('env') === 'development'){
    app.use(morgan('tiny')); //it log every request.
    //startupDebugger('Morgan Enabled...');
    debug('Morgan Enabled...');
}

//Db work 
//dbDebugger('Connected to database');

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on ${port}...`);
})
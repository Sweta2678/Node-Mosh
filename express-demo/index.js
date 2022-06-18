const Joi = require('joi');
const express = require('express');
const logger = require('./logger');
const authentication = require('./authentication');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
//npm rc and config both for configuration
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`); //environment variable // we can set environment variable using cmd - set NODE_ENV=production
console.log(`app: ${app.get('env')}`); //environment variable 

app.use(express.json());
app.use(logger);        
app.use(authentication);
app.use(express.urlencoded()); //it is traditional approach. we can pass parasm in post request with the x-www-form-urlencoded in body.
app.use(express.static('public'));
app.use(helmet());

//console. log(process. env);

//Configuration
//to set environment cmd = set NODE_ENV = production
//to set any env vriable cmd = set app_password = 1234
console.log('Application Name...'+config.get('name'));
console.log('Mail Server...'+config.get('mail.host'));
console.log('Mail password...'+config.get('mail.password'));


if(app.get('env') === 'development'){
    app.use(morgan('tiny')); //it log every request.
    console.log('Morgan Enabled');
}

let courses = [{
        id: 1,
        name: "course1"
    },
    {
        id: 2,
        name: "course2"
    },
    {
        id: 3,
        name: "course3"
    }
]

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/api/courses/', (req, res) => {
    res.send(courses);
    res.end();
});

app.post('/api/courses/', (req, res) => {

    const {error} = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    //res.send(req.params.id);
    console.log(req.params.id);
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send(`Record for given Id not available.`);
    res.send(course);
});


app.put('/api/courses/:id', (req, res) => {
    //lookup for courses
    let course = courses.find(c => c.id === parseInt(req.params.id));
    console.log(course);
    if (!course) return res.status(404).send(`Record for given Id not available.`);

    //validation
    const {error} = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id',(req,res)=>{
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Record for given Id not available.`);

    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);

});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on ${port}...`);
})
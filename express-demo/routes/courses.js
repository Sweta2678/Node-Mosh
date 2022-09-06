const express = require('express');
const router = express.Router();
const Joi = require('joi');


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

router.get('/', (req, res) => {
    res.send(courses);
    res.end();
});

router.post('/', (req, res) => {

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

router.get('/:id', (req, res) => {
    //res.send(req.params.id);
    console.log(req.params.id);
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send(`Record for given Id not available.`);
    res.send(course);
});

router.get('/name/:name', (req, res) => {
    //res.send(req.params.id);
    console.log(req.params.name);
    let course = courses.find(c => c.name === req.params.name);
    if (!course) res.status(404).send(`Record for given Name not available.`);
    res.send(course);
});



router.put('/:id', (req, res) => {
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

router.delete('/:id',(req,res)=>{
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

module.exports = router;
const express = require('express');
const app = express();

app.use(express.json());

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

app.post('/api/courses/',(req,res)=>{
    if(!req.body.name || req.body.name.length<3){
        res.status(404).send('Name is required and should be minimum 3 character');
        return;
    }
     const course ={
        id:courses.length+1,
        name:req.body.name
     };
     courses.push(course);
     res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    //res.send(req.params.id);
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send(`Record for given Id ${id} not available.`);
    res.send(course);
});

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on ${port}...`);
})
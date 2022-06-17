const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

genres = [{id:1,name:"Horror"},
            {id:2,name:"Comedy"},
            {id:3,name:"Romance"}
        ]

app.get('/api/genres',(req,res)=>{
    if(!genres.length>0) return res.status(404).send('No genre definded...');
    res.send(genres);
    res.end();
});

app.get('/api/genres/:id',(req,res)=>{
    let genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('No genre associated with the requested Id...');
    res.send(genre);
    res.end();
});

app.post('/api/genres',(req,res)=>{
    const {error} = validateGenreName(req.body);
    if(error)  return res.status(400).send(error.details[0].message);
    
    const genre = {
        id: genres.length+1,
        name : req.body.name
    }
    genre.name =  req.body.name;
    res.send(genre);
    res.end();
});

app.put('/api/genres/:id',(req,res)=>{
    let genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('No genre associated with the requested Id...');

    const {error} = validateGenreName(req.body);
    if(error)  return res.status(400).send(error.details[0].message);
    
    genre.name  = req.body.name;
    res.send(genre);
    res.end();
});

app.delete('/api/genres/:id',(req,res)=>{
    let genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('No genre associated with the requested Id...');
    
    const index = genres.indexOf(genre);
    genres.splice(index,1);

    res.send(genres);
    res.end();
});

function validateGenreName(genre){
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });
    return schema.validate(genre);
}

var port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`listening on port ${port}...`);
});
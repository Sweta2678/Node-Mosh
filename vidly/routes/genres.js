const express = require('express');
const router = express.Router();
const Joi = require('joi');
router.use(express.json());

genres = [{id:1,name:"Horror"},
            {id:2,name:"Comedy"},
            {id:3,name:"Romance"}
        ]

router.get('/',(req,res)=>{
    if(!genres.length>0) return res.status(404).send('No genre definded...');
    res.send(genres);
    res.end();
});

router.get('/:id',(req,res)=>{
    let genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('No genre associated with the requested Id...');
    res.send(genre);
    res.end();
});

router.post('/',(req,res)=>{
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

router.put('/:id',(req,res)=>{
    let genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('No genre associated with the requested Id...');

    const {error} = validateGenreName(req.body);
    if(error)  return res.status(400).send(error.details[0].message);
    
    genre.name  = req.body.name;
    res.send(genre);
    res.end();
});

router.delete('/:id',(req,res)=>{
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

module.exports = router;
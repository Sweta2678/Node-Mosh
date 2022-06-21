const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Joi = require('joi');
router.use(express.json());

const genreSchema  = new mongoose.Schema({
    name: 
    {
        type:String,
        required:true,
        minlength:5,
        maxlength:50    
    }
});

const Genre = mongoose.model('Genre',genreSchema);

router.get('/',async (req,res)=>{
    const genres = await Genre.find().sort('name');
    if(!genres.length>0) return res.status(404).send('No genre definded...');
    res.send(genres);
    //res.end();
});

router.get('/:id',async (req,res)=>{
    let genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('No genre associated with the requested Id...');
    res.send(genre);
    //res.end();
});

router.post('/',async (req,res)=>{
    const {error} = validateGenreName(req.body);
    if(error)  return res.status(400).send(error.details[0].message);
    let genre = new Genre({
        name :  req.body.name
    })
    genre = await genre.save();
    res.send(genre);
    //res.end();
});

router.put('/:id',async (req,res)=>{
    const {error} = validateGenreName(req.body);
    if(error)  return res.status(400).send(error.details[0].message);

    let genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
    if(!genre) return res.status(404).send('No genre associated with the requested Id...');

    res.send(genre);
    //res.end();
});

router.delete('/:id',async (req,res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(404).send('No genre associated with the requested Id...');
   
    res.send(genre);
    //res.end();
});

function validateGenreName(genre){
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });
    return schema.validate(genre);
}

module.exports = router;
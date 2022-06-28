const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const {Genre,validate} = require('../models/genre');
const router = express.Router();

router.use(express.json());

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

router.post('/',auth,async (req,res)=>{
    const {error} = validate(req.body);
    if(error)  return res.status(400).send(error.details[0].message);
    let genre = new Genre({
        name :  req.body.name
    })
    genre = await genre.save();
    res.send(genre);
    //res.end();
});

router.put('/:id',async (req,res)=>{
    const {error} = validate(req.body);
    if(error)  return res.status(400).send(error.details[0].message);

    let genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
    if(!genre) return res.status(404).send('No genre associated with the requested Id...');

    res.send(genre);
    //res.end();
});

router.delete('/:id',[auth,admin],async (req,res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(404).send('No genre associated with the requested Id...');
   
    res.send(genre);
    //res.end();
});

module.exports = router;
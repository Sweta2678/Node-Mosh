const express = require('express');
const mongoose = require('mongoose');
const { Genre } = require('../models/genre');
const {Movie,validate} = require('../models/movie');
const router = express.Router();

router.use(express.json());

router.get('/',async (req,res)=>{
    const movies = await Movie.find().sort('title');
    if (!movies.length > 0) return res.status(404).send('No movies available...');
    res.send(movies);
});

router.get('/:id',async (req,res)=>{
    let movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send('No movie associated with the requested Id...');
    res.send(movie);
});

router.post('/',async (req,res)=>{
    const {error} = validate(req.body);
    if(error)  return res.status(400).send(error.details[0].message);

    const getGenre = Genre.findById(req.body.genreId);

    if(!getGenre) return res.status(400).send('Invalid Genre');

    let movie = new Movie({
        title :  req.body.title,
        genre : {
            _id:getGenre._id,
            name:getGenre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    });
    console.log(movie);
    movie = await movie.save();
    console.log(movie);
    res.send(movie);
});

router.put('/:id',async (req,res)=>{
    const {error} = validate(req.body);
    if(error)  return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genre);
    if(!genre) return res.status(400).send('Invalid Genre');

    let movie = await Movie.findByIdAndUpdate(req.params.id,
        {title:req.body.title,
        genre : {
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate   
        },
        {new:true});

    if(!movie) return res.status(404).send('No movie associated with the requested Id...');
    res.send(movie);
});

router.delete('/:id',async (req,res)=>{
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(404).send('No movie associated with the requested Id...');  
    res.send(movie);
});


module.exports = router;

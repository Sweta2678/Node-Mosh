const express = require('express');
const Joi = require('joi');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
.then(()=>console.log('Connected to mongodb...'))
.catch(err=>console.error('could not connect to mongodb'));

app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals', rentals);



var port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`listening on port ${port}...`);
});
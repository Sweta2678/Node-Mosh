const error = require('./middleware/error')
const config = require('config');
const express = require('express');
const Joi = require('joi');
Joi.objectId= require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwt private key is not definded');
    process.exit(1);
}
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
app.use('/api/users',users);
app.use('/api/auth',auth);

app.use(error);



var port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`listening on port ${port}...`);
});
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/playground')
.then(()=> console.log('Connected to MongoDb'))
.catch((err)=> console.log('could not connect',err));


const courseSchema = new mongoose.Schema({
    name :String,
    author : String,
    tags : [String],
    date : { type: Date , default : Date.now},
    isPublished : Boolean
});
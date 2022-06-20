const { Schema } = require('mongoose');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(() => console.log('connecting to mongodb'))
.catch(err=>console.log('could not connect',err));

const courseSchema = new mongoose.Schema({
    name :String,
    author : String,
    tags : [String],
    date : { type: Date , default : Date.now},
    isPublished : Boolean,
    price : Number
});

const Course = mongoose.model('Course',courseSchema);

async function getCourses(){
    const courses = await Course
    //.find({isPublished:true, tags : {$in:['frontend','backend']}})
    .find({})
    .or([
        {price:{$gte : 15}},
        {name:'/.*by.*/' }
    ])
    
    //.and({title:'/*.by.*/'});
    //.sort({price: -1})
    //.sort('-price')
    //.select({name:1, author:1});
    .select('name author price isPublished');
   return courses;
}
async function run(){
    const coursesList =  await getCourses();
    console.log(coursesList);
}
run();

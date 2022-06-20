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
const Course  = mongoose.model('Course',courseSchema);

async function createCourse(){
    const course  = new Course({
        name : 'Angular course',
        author:'Mosh',
        tags : ['angular','frontend'],
        isPublished: true
    });
    const result = await course.save();
    console.log('Result' + result);
}
async function getCourses(){
    const pageNumber = 2 ;
    const pageSize =10;
    const courses = await Course
        .find({author:'Mosh',isPublished:true})
        .skip((pageNumber-1)*pageSize)
        .limit(pageSize)
        .sort({name:1})
        .select({name:1,tags:1});
    console.log(courses);
}

//createCourse();
getCourses();

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
    const courses = await Course
        //comparison in query
        .find({author:'Mosh',isPublished:true})
        //.find({price:{$gte  :10 }})
        //.find({price:{$gte  :10 , $lte:15}})
        //.find({price:{$in : [10,15,20]}})

        //logical operators
        // .find()
        // .or([{author:'Mosh'},{isPublished:true}])
        // .and([{author:'Mosh'},{isPublished:true}])

        //regular expression 
        //starts with Mosh
        //.find({author:'/^Mosh/'})

        //ends with khatsuriya
        //.find({author:'/khatsuriya$/i'}) // i for case in sensitive

        //contains Mosh
        //.find({author:'/.*Mosh.*/'})
        .limit(10)
        .sort({name:1})
        //counting
        .count();
       // .select({name:1,tags:1});
    console.log(courses);
}

//createCourse();
getCourses();

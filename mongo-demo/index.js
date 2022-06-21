const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDb'))
    .catch((err) => console.log('could not connect', err));


const courseSchema = new mongoose.Schema({
    name: {
        type:String, 
        required :true,
        minlength:5,
        maxlength:255,

    },
    category:{
        type:String,
        required:true,
        enum:['web','mobile','network']
    },
    author: String,
    tags:{
        type:Array,
        validate:{
            isAsync:true,
                validator:function (v,callback){
                    setTimeout(()=>{
                        //Do some Async work
                        const result = v && v.length>0;
                        callback(result);
                    },2000);
                },
            message:'Course should have atleast one tag'
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean,
    price:{
        type:Number,
        required: function() {return this.isPublished; },
        min:10,
        max:100
    }
});
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Node course',
        category:'-',
        author: 'Sweta',
        tags: [],
        isPublished: true,
        price:15 
    });
    try{
        //await course.validate();
        const result = await course.save();
        console.log('Result' + result);
    }
    catch(ex){
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
    
}
async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;
    const courses = await Course
        .find({
            author: 'Mosh',
            isPublished: true
        })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({
            name: 1
        })
        .select({
            name: 1,
            tags: 1
        });
    console.log(courses);
}

//approach-1
// async function updateCourses(id){
//     const course = await Course.findById(id);
//     if(!course) return;

//     course.isPublished = true;
//     course.author = 'Another Author';

//     // course.set({
//     //     isPublished:true,
//     //     author:'Another Author'
//     // });

//     const result = await course.save();
//     console.log(result);
// }


//approach-2
async function updateCourses(id) {
    const result = await Course.update(
        {_id: id}, 
        {
            $set: {
                author: 'Mosh',
                isPublished: false
            }
        });

    console.log(result);
}

//
async function updateCourse(id) {
    const result = await Course.findByIdAndUpdate(
        id, 
        {
            $set: {
                author: 'Shweta Khatsuriya',
                isPublished: true
            }
        },{new:true});

    console.log(result);
}

async function removeCourse(id) {
    //const result = await Course.deleteOne({_id:id});
    const course = await Course.findByIdAndRemove(id);
    if(!course) return;
    console.log(course);
}

createCourse();
//getCourses();

//updateCourses('62b03382e9b2fb1d002df98c');
//updateCourse('62b03382e9b2fb1d002df98c');
//removeCourse('62b03382e9b2fb1d002df98c');
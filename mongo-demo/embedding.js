const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  //author:authorSchema - to make it required , pass into object form
  author:{
    type: authorSchema,
    required:true
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

// async function updateAuthor(courseId){
//   const course = await Course.findById(courseId);
//   course.author.name = 'Swetaa';
//   course.save();
// }

async function updateAuthor(courseId){
  const course = await Course.update({_id:courseId},{
    $set:{ //unset: it is used for to remove object.
      'author.name':'John'
    }
  });
}

updateAuthor('62b21a0483d6ce1f443dedbf');

//createCourse('Node Course', new Author({ name: 'Mosh' }));
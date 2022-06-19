const p = new Promise((resolve,reject)=>{
    //kick off some async work
    //...
    //value or error
    setTimeout(()=>{
        //resolve(1); //pending -> resolved or fullfill
        reject(new Error('message'));  //pending -> reject
    },2000);
});

p
    .then(result=> console.log('result',result))
    .catch(err => console.log('error',err.message)); 
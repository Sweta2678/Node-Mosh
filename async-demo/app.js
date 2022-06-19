console.log('before');
getUser(1,(user)=>{
   //console.log('User',user);
    getRepositories(user.gitHubUsername,(repos)=>{
        console.log('Repos',repos);
    });
});
console.log('after');

//callbacks
//Promises
//Async/await

function getUser(id,callback){
    setTimeout(()=>{
        console.log('Reading a user from a database...');
        callback({id: id, gitHubUsername: 'Sweta'});
    },1000);
}

function getRepositories(username,callback){
    setTimeout(()=>{
        console.log('reading repo values');
        callback(['repo1','repo2','repo3']);
    },500);
    //return ['repo1','repo2','repo3'];
}
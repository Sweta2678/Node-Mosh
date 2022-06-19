console.log('before');
getUser(1,getRepositories);
console.log('after');

function getRepositories(user){
    getRepositories(user.gitHubUsername,getCommits);
}

function displayCommits(commits){
    console.log(commits);
}

function getCommits(repos){
    console.log(repos);
    //getCommits(repos,displayCommits);
}

function getUser(id,callback){
    setTimeout(()=>{
        console.log('Reading a user from a database...');
        callback({id: id, gitHubUsername: 'Sweta'});
    },3000);
}

function getRepositories(username,callback){
    setTimeout(()=>{
        console.log('reading repo values');
        callback(['repo1','repo2','repo3']);
    },5000);
}
console.log('before');
//getUser(1,getRepositories);
console.log('after');

getUser(1)
.then(user => getRepositories(user.gitHubUsername))
.then(repos => getCommits(repos[0]))
.then(commits=> console.log('Commits',commits));
// function getRepositories(user){
//     getRepositories(user.gitHubUsername,getCommits);
// }

// function getCommits(repos){
//     getCommits(repos,displayCommits);
// }

// function displayCommits(commits){
//     console.log(commits);
// }

function getUser(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('Reading a user from a database...');
            resolve({id: id, gitHubUsername: 'Sweta'});
        },2000);
    });
}

function getRepositories(username){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('reading repo values');
            resolve(['repo1','repo2','repo3']);
        },2000);
    });
}

function getCommits(repo){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('calling Githug API');
            resolve(['commits']);
        },2000);
    });
}
console.log('before');
//getUser(1,getRepositories);

//promise based approach
// getUser(1)
// .then(user => getRepositories(user.gitHubUsername))
// .then(repos => getCommits(repos[0]))
// .then(commits=> console.log('Commits',commits));

//Async and await 
async function displayCommits() {
    try{
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }catch(err){
        console.log(err.message);
    }
}

displayCommits();

console.log('after');

//Named function approach
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
            //resolve(['repo1','repo2','repo3']);
            reject(new Error('Something went wrong'));
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
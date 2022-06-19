console.log('before');
const user = getUser(1);
console.log('after');

//callbacks
//Promises
//Async/await

function getUser(id){
    setTimeout(()=>{
        console.log('Reading a user from a database...');
        return {id: id, gitHubUsername: 'Sweta'};
    },1000);
    
}
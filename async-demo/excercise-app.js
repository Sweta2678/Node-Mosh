// getCustomer(1, (customer) => {
//     console.log('Customer: ', customer);
//     if (customer.isGold) {
//       getTopMovies((movies) => {
//         console.log('Top movies: ', movies);
//         sendEmail(customer.email, movies, () => {
//           console.log('Email sent...')
//         });
//       });
//     }
//   });

async function sendEmailtoGoldCustomer(){
    try{
        const customer = await getCustomer(1);
        if(customer.isGold){
            const movies = await getTopMovies();
            const sent = await sendEmail(customer.email,movies);
            console.log('email send');
        }
    }
    catch(err){
        console.log(new Error(err.message));
    } 
}  

sendEmailtoGoldCustomer();

  function getCustomer(id) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve({ 
              id: 1, 
              name: 'Mosh Hamedani', 
              isGold: true, 
              email: 'email' 
            });
          }, 4000);  
    });
  }
  
  function getTopMovies() {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
          }, 4000);
    });
  }
  
  function sendEmail(email, movies) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve();
          }, 4000);
    });
  }
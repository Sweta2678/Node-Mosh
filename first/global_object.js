// console.log();

// setTimeout(2000);
// clearTimeout();

// setInterval();
// clearInterval();

//we can access global objects using global prefix. 
var message = 'Sweta';
console.log(global.message);// undefined.. coz message scope is within file.
console.log(message); //Sweta
//global.setTimeout() 
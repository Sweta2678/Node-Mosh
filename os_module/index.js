const os = require('os');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log('Total Memory' + totalMemory);
console.log(`total Memoery: ${totalMemory}`); //ES6 or ECMA
console.log(`Free Memoery: ${freeMemory}`); //ES6 or ECMA

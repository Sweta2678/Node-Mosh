var _ = require('underscore'); 
//first check - core module but in node there is no module named underscore then file
// if ./underscore then it means we have file named underscore.js , then check into
//node_module

var value = _.contains([1,2,3],3);
console.log(value);
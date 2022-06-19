to set environement at the same time with app starting, we can use foll command.
DEBUG=app:db nodemon index

if only one debugger available in system, then we can use var debug, it work as console.log()

Templating engines : 

pug
mustache
EJS

app.set('view engine','pug');
app.set('views','./views') // default

var express = require('express');
var exphbs = require('express-handlebars');
var PORT = process.env.PORT || 3000;

// set up express app

var app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up handlbars 

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// import routes  

var routes = require('./controllers/burgers_controller.js');
app.use(routes);

// Start the server 

app.listen(PORT, function() {
    console.log (' ');
    console.log (' ');
    console.log (' ');
    console.log("Express server listening on: http://localhost:" + PORT);
    console.log (' ');
});
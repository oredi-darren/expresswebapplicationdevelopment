/**
 * Created by dseet on 6/25/2014.
 */
// Include the Node HTTP library
var http = require('http');
// Include the Express module
var express = require('express');
// Include the Path module
var path = require('path');
// Create an instance of Express
var app = express();

// Set the view engine
app.set('view engine', 'jade');
// Where to find the view files
app.set('views', './views');
// Mark the public dir as a static dir
app.use(express.static(path.join(__dirname, 'public')))

// A route for the home page - will render a view
app.get('/', function (req, res) {
    res.render('index');
});

// A route for /say-hello - will render a view
app.get('/say-hello', function (req, res) {
    res.render('hello');
});

app.get('/test', function (req, res) {
    res.send('this is a test');
});

// Start the app
http.createServer(app).listen(3000, function () {
    console.log('Express app started');
})

// A route for the home page
app.get('/', function (req, res) {
    res.send('Welcome!');
});
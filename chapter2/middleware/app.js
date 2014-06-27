var express = require('express');
var path = require('path');
var responseTime = require('response-time');
var errorhandler = require('errorhandler');
var logger = require('morgan');
var fs = require('fs');
// Load the iniparser module
var iniparser = require('iniparser');
// Read the ini file and populate the content on the config object
var iniConfig = iniparser.parseSync('../config.ini');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var config = require('./config.json')[app.get('env')];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(responseTime(5));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger({ format: ':remote-addr :method :url'}));
app.use(logger({
    format: 'tiny',
    stream: fs.createWriteStream('app.log', { 'flags': 'w' })
}));
app.use('/', routes(iniConfig));
app.use('/users', users);
app.get('/error', function (req, res) {
    // Call an undefined function to generate an error
    fail();
});
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers
app.use(errorhandler());

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

console.log(config.db_host);
console.log(config.db_user);
console.log(config.db_pass);

module.exports = app;

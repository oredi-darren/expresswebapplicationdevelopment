var express = require('express');
var router = express.Router();

module.exports = function (config) {
    /* GET home page. */
    router.get('/', function(req, res) {
        res.render('index', { title: config.title, message: config.message });
    });

    return router;
};


// *** load config *** //
const config = require('./config/config.js');

// *** main dependencies *** //
const express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var chalk = require('chalk');

// *** config middleware *** //
app.use(bodyParser.json());
app.use(cookieParser()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));

// *** connect mongoose *** //
mongoose.connect(config.DB.uri, config.DB.options, (err) => {
    if(err) {
      console.log(err);
    }
    console.log(chalk.green('Connected MongoDB successfully'));
});

// *** create server *** //
var server = app.listen(8080, function () {
 
    let host = server.address().address
    let port = server.address().port
   
    console.log("App listening at http://%s:%s", host, port);
});
   

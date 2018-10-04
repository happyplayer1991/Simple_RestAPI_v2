
// *** load config *** //
const config = require('./config/config.js');

// *** main dependencies *** //
const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var chalk = require('chalk');



/**
 * config Middleware
 */
module.exports.initMiddleware = function (app) {
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
}
  
/**
 * Set main routes
 */
module.exports.initModulesServerRoutes = function (app) {
    require('./route/place.route')(app);
};


/**
 * Load models
 */
module.exports.loadModel = function () {
    require('./model/place.model');
};

/**
 * Seed
 */
module.exports.seed = function () {
 
    let places = [
      {
        locationName: "Place1",
        description: "Place1",
        latitude: '36.7',
        longitude: '45.8'
      },
      {
        locationName: "Place2",
        description: "Place2",
        latitude: '83.1',
        longitude: '11.2'
      },
    ]
   
    // Init data -> save to MongoDB
    const Place = require('./model/place.model');
    
    Place.create(places);  
  }

/**
 * Create mongoose
 */
module.exports.connectMongoDB = function () {

    mongoose.connect(config.DB.uri, config.DB.options, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log(chalk.green('Connected MongoDB successfully'));
        
            // *** insert seed data **/
            this.seed();
        }
    });

}
/**
 * Create Http Server
 */
module.exports.createServer = function (app) {
      
    var server = app.listen(8080, function () {
        
        let host = server.address().address || config.Server.Host
        let port = server.address().port
    
        console.log("App listening at http://%s:%s", host, port);
    });

}


module.exports.init = function () {
    var app = express();
    this.loadModel();
    this.initMiddleware(app);
    this.initModulesServerRoutes(app);
    this.connectMongoDB();
    this.createServer(app);
}

this.init();
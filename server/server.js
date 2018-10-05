
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
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cookieParser()); 
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false
        }
    }));

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if(req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
            return res.status(200).json({});
        }
        next();
    });
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
          locationName: "Vancouver",
          description: "City of Canada",
          latitude: '49.2827',
          longitude: '123.1207'
        },
        {
          locationName: "Kiev",
          description: "City of Ukraine",
          latitude: '50.4501',
          longitude: '30.5234'
        },
        {
          locationName: "Berlin",
          description: "City of Germany",
          latitude: '52.5200',
          longitude: '13.4050'
        },
        {
          locationName: "New York City",
          description: "City of United States",
          latitude: '40.7128',
          longitude: '74.0060'
        },
        {
          locationName: "Tokyo",
          description: "City of Japan",
          latitude: '35.6895',
          longitude: '139.6917'
        }
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
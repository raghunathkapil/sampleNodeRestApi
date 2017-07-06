//System JS

//Call the packages we need.
var express = require('express'); //call express.
var app = express(); //define app using express.

var bodyParser = require('body-parser');
var path = require('path');

//Configure app with body parser.
//this will var us to get data from a POST.

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 9080; //set the port.

/** ======= Router for APP ============= */

var router = express.Router(); //Get instance of express router.

//for testing

app.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

var apiRouter = require('./server/routers/apiRouter');
app.use('/api', apiRouter);


/** START THE SERVER **/

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});

/** Connect Mongo DB using mongoose */

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var dbPath = "mongodb://localhost/test"; //URL Path of MongoDB.

//Create connection.
mongoose.connect(dbPath, function(err) {
    if (err) {
        console.log("Mongo DB is not Connected");
    } else {
        console.log("Mongo DB connected");
    }
});
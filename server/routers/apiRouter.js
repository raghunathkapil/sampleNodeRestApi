/**
 * apiRouter.js
 * 
 * File contains all the respect api routers at one place.
 */


//Call the packages we need.
var express = require('express'); //call express.
var app = express(); //define app using express.

//Import Controllers.
var userController = require('../controller/userController');

//User API Router
app.use('/user', userController);

/** Can Add other Controllers Routering */

//Export App.
module.exports = app;
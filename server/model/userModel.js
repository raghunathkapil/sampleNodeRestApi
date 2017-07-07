/**
 * userModel.js
 * 
 * User schema is define and the model is created.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    phoneNo: String
});

//Export User schema module
module.exports = mongoose.model('userSchema', userSchema);
/**
 * userService.js
 * 
 * Contains all the Mongo DB services which supports User Curd operations.
 */

//Get User module
var users = require('../model/userModel');
var Q = require('q');

//empty user service object created.
var userService = {};

//Functions are added to the user servide object
userService.getUsers = getUsers;
userService.getUserByEmail = getUserByEmail;
userService.deleteUser = deleteUser;
userService.createUser = createUser;
userService.updateUser = updateUser;

/**
 * Function Use to Get all the users.
 */
function getUsers() {
    var deferred = Q.defer();
    users.find({}, function(err, users) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(users);
        }
    });
    return deferred.promise;
}

/**
 * Function used to get single user with respective to email.
 * @param {*} email 
 */
function getUserByEmail(email) {
    var deferred = Q.defer();
    users.find({ email: email }, function(err, user) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(user);
        }
    });
    return deferred.promise;
}

/**
 * Function used to create New User.
 * @param {*} userData 
 */
function createUser(userData) {
    var deferred = Q.defer();
    // create a new user
    var newUser = new users({
        name: userData.name,
        email: userData.email,
        phoneNo: userData.phoneNo
    });

    newUser.save(function(err) {
        if (err) {
            deferred.reject(err);
        }

        deferred.resolve();
    });

    return deferred.promise;
}

/**
 * Function Used to Update existing user with respective email.
 * @param {*} email 
 * @param {*} userData 
 */
function updateUser(email, userData) {
    var deferred = Q.defer();
    users.update({ email, email }, userData, function(err) {
        if (err) {
            deferred.reject(err);
        }
        deferred.resolve();
    });
    return deferred.promise;
}

/**
 * Function used to delete user with respective to email
 * @param {*} email 
 */
function deleteUser(email) {

    var deferred = Q.defer();
    users.remove({ email: email }, function(err) {
        if (err) {
            deferred.reject(err);
        }
        deferred.resolve();
    });
    return deferred.promise;
}

//module exports.
module.exports = userService;
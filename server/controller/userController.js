/**
 * userController.js
 * 
 * Contains all the Curd Operations Related to User
 */

//Call the packages we need.
var express = require('express'); //call express.
var bodyParser = require('body-parser');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

//Get User module
var userService = require('../services/userService');

router.get('/', getUsers);
router.get('/:email', getUserByEmail);
router.post('/', createUser);
router.put('/:email', updateUser);
router.delete('/:email', deleteUser);

/**
 * Returns All Users
 */
function getUsers(req, res) {
    userService.getUsers()
        .then(function(users) {
            if (users) {
                res.send(users);
            } else {
                res.sendStatus(404);
            }
        });
}


/**
 * Return single user required
 */
function getUserByEmail(req, res) {
    userService.getUserByEmail(req.params.email)
        .then(function(user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        });
}

/**
 * Insert user in to the database.
 */
function createUser(req, res) {
    userService.getUserByEmail(req.body.email)
        .then(function(user) {
            if (user.length != 0) {
                res.send({ "message": "Email already Exists" });
            } else {
                userService.createUser(req.body)
                    .then(function(err) {
                        if (err) {
                            res.sendStatus(404);
                        } else {
                            res.send({ "message": "User Created!" });
                        }
                    });
            }
        });
}

/**
 * Update Single User.
 */
function updateUser(req, res) {

    userService.getUserByEmail(req.params.email)
        .then(function(user) {
            if (user.length == 0) {
                res.send({ "message": "Email Not Found!" });
            } else {
                userService.updateUser(req.params.email, req.body)
                    .then(function(err) {
                        if (err) {
                            res.sendStatus(404);
                        } else {
                            res.send({ "message": "User Updated!" });
                        }
                    });
            }

        });
}

/**
 * Delete Single User
 */
function deleteUser(req, res) {
    userService.getUserByEmail(req.params.email)
        .then(function(user) {
            if (user.length == 0) {
                res.send({ "message": "Email Not Found!" });
            } else {
                userService.deleteUser(req.params.email)
                    .then(function(err) {
                        if (err) {
                            res.sendStatus(404);
                        } else {
                            res.send({ "message": "User Deleted!" });
                        }
                    });
            }
        });
}

module.exports = router;
//Call the packages we need.
var express = require('express'); //call express.
var bodyParser = require('body-parser');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

//Get User module
var users = require('../model/userModel');

/**
 * Returns All Users
 */
router.get('/', function(req, res) {

    users.find({}, function(err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

/**
 * Return single user required
 */
router.get('/:email', function(req, res) {
    users.find({ email: req.params.email }, function(err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

/**
 * Insert user in to the database.
 */
router.post('/', function(req, res) {

    // create a new user
    var newUser = new users({
        name: req.body.name,
        email: req.body.email,
        phoneNo: req.body.phoneNo
    });

    // save the user
    newUser.save(function(err) {
        if (err) {
            throw err;
        }

        console.log('User created!');
    });
});

/**
 * Update Single User.
 */
router.put('/:email', function(req, res) {
    var data = req.body || {}

    if (data._id) {
        users.update({ _id: data._id }, data, function(err) {
            if (err) console.log("Update Error : " + err);

            console.log('User Updated using ID!');
        });
    } else {
        users.update({ email: req.params.email }, data, function(err) {
            if (err) console.log("Update Error : " + err);

            console.log('User Updated using Email!');
        });
    }

});

/**
 * Delete Single User
 */
router.delete('/:email', function(req, res) {
    users.remove({ email: req.params.email }, function(err) {
        if (err) console.log('Delete Error : ' + err);

        console.log("User Deleted");
    });
});

module.exports = router;
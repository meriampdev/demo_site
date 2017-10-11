var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var User = require('../models/User');

// CREATES A NEW USER
router.post('/', function (req, res) {
    User.create({
            name : 'yam',
            email : 'yam@stud.com',
            password : 'Passw0rd3'
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});
// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
  console.log('finding users')
    User.find({'name': 'yam'}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
})

module.exports = router;

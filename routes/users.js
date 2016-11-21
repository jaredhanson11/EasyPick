var express = require('express');
var router = express.Router();
var utils = require('../utils.js');

var UsersController = require('../controllers/UsersController');

/** post route for /users. signs up a new user */
router.post('/', function(req, res) {
  UsersController.signup(req, res);
});

router.get('/:id', function(req, res) {
  UsersController.get_profile(req, res);
});

//router.post('/:id/review', function(req, res) {
//    UsersController.post_review(...);
//});
module.exports = router;

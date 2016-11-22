var express = require('express');
var router = express.Router();
var utils = require('../utils.js');

var UsersController = require('../controllers/UsersController');

/** post route for /users. signs up a new user */
router.post('/', function(req, res) {
  UsersController.signup(req, res);
});

router.get('/', function(req, res) {
  UsersController.get_profile(req, res);
});

router.put('/', function(req, res){
    UsersController.edit_profile(req, res);
})

router.post('/review', function(req, res) {
    UsersController.post_review(req, res);
});
module.exports = router;

var express = require('express');
var utils = require('../utils.js');
var router = express.Router();
var SessionsController = require('../controllers/SessionsController');
var UsersController = require('../controllers/UsersController');

/** post route for /login. logins in a user */
router.post('/login', function(req, res, next) {
  SessionsController.login(req, res);
});

/** post route for /logout. if user is logged in, logs them out. */
router.post('/logout', utils.auth, function(req, res, next) {
  SessionsController.logout(req, res);
});

/** activates a user */
router.post('/activate/:token', function(req, res, next) {
  UsersController.activate(req, res);
});


module.exports = router;

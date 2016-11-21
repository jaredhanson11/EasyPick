var express = require('express');
var router = express.Router();
var utils = require('../utils.js');

var UsersController = require('../controllers/UsersController');

/** post route for /users. signs up a new user */
router.post('/', function(req, res) {
  UsersController.signup(req, res);
});

router.get('/:id', function(req, res) {
  res.json({
    success: true,
    user: req.session.user
  })
})
module.exports = router;

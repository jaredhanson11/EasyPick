var express = require('express');
var router = express.Router();
var utils = require('../utils.js');

var UsersController = require('../controllers/UsersController');

var defaultRecs = ['6.170', '6.828', '14.11', '21G.402'];

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

router.get('/:id', function(req, res) {
  res.json({
    success: true,
    user: req.session.user
  })
});

router.get('/recommendations', function(req, res) {
	res.json({
		success: true,
		recommendations: defaultRecs
	})
});

module.exports = router;

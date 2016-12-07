var express = require('express');
var router = express.Router();
var utils = require('../utils.js');

var UsersController = require('../controllers/UsersController');

/** post route for /users. signs up a new user */
router.post('/', function(req, res) {
  UsersController.signup(req, res);
});

router.get('/', utils.auth, function(req, res) {
  UsersController.get_profile(req, res);
});

router.put('/', utils.auth, function(req, res){
    UsersController.edit_profile(req, res);
})

router.post('/review', utils.auth, function(req, res) {
    UsersController.post_review(req, res);
});

//router.put('/review', utils.auth, function(req, res) {
//    UsersController.editReview(req, res);
//});

//router.delete('/review', utils.auth, function(req, res) {
//    UsersController.delReview(req, res);
//});

router.post('/wishlist', utils.auth, function(req, res){
    UsersController.postToWishlist(req, res);
});

//router.delete('/wishlist', utils.auth, function(req, res){
//    UsersController.removeFromWishlist(req, res);
//});

module.exports = router;

var express = require('express');
var router = express.Router();
var utils = require('../utils.js');

var UsersController = require('../controllers/UsersController');

/** get route for user profile page */
router.get('/', utils.auth, function(req, res) {
  UsersController.getProfile(req, res);
});

/** put route for editing user profile */
router.put('/', utils.auth, function(req, res){
    UsersController.editProfile(req, res);
})

/** post route for creating a review for a class */
router.post('/review', utils.auth, function(req, res) {
    UsersController.postReview(req, res);
});

/** put route for editing a review */
router.put('/review', utils.auth, function(req, res) {
    UsersController.editReview(req, res);
});

/** post route for adding a class to a user's wishlist */
router.post('/wishlist', utils.auth, function(req, res){
    UsersController.postToWishlist(req, res);
});

/** delete route for removing a class from a user's wishlist */
router.delete('/wishlist', utils.auth, function(req, res){
    UsersController.removeFromWishlist(req, res);
});

module.exports = router;

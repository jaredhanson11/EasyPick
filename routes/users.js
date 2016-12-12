var express = require('express');
var router = express.Router();
var utils = require('../utils.js');

var UsersController = require('../controllers/UsersController');

router.get('/', utils.auth, function(req, res) {
  UsersController.getProfile(req, res);
});

router.put('/', utils.auth, function(req, res){
    UsersController.editProfile(req, res);
})

router.post('/review', utils.auth, function(req, res) {
    UsersController.postReview(req, res);
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

router.delete('/wishlist', utils.auth, function(req, res){
    UsersController.removeFromWishlist(req, res);
});

module.exports = router;

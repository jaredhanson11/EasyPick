var express = require('express');
var router = express.Router();
var utils = require('../utils.js');

var UsersController = require('../controllers/UsersController');

router.get('/courses', utils.auth, function(req, res) {
    console.log("route");
    UsersController.getRecommendations(req, res);
});

module.exports = router;

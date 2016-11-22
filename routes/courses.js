/**
 * Created by Famien Koko on 11/21/2016.
 */
var express = require('express');
var router = express.Router();
var utils = require('../utils.js');

var CoursesController = require('../controllers/CoursesController');

/** GET route for searching for courses */
router.post('/search', function (req, res) {
    CoursesController.search(req, res);
});

module.exports = router;

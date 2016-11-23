/**
 * Created by Famien and Lara.
 */
var express = require('express');
var router = express.Router();
var utils = require('../utils.js');

var CoursesController = require('../controllers/CoursesController');

/** GET route for searching for courses */
router.post('/search', function (req, res) {
    CoursesController.search(req, res);
});

/** get route for /courses/:course_number. display the course page */
router.get('/:course_number', utils.auth, function(req, res) {
  CoursesController.getCourseInfo(req, res);
});

/** get route for /courses/:course_number. display the course page */
router.get('/:course_number/stats', utils.auth, function(req, res) {
  CoursesController.getCourseStats(req, res);
});

module.exports = router;

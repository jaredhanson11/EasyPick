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

/** get route for /courses/:course_number. return basic course info */
router.get('/:course_number', utils.auth, function(req, res) {
  CoursesController.getCourseInfo(req, res);
});

/** get route for /courses/:course_number/stats. return basic course stats */
router.get('/:course_number/stats', utils.auth, function(req, res) {
  CoursesController.getCourseStats(req, res);
});

/** get route for /courses/:course_number/comments. return course comments*/
router.get('/:course_number/comments', utils.auth, function(req, res) {
  CoursesController.getCourseComments(req, res);
});

/** get route for /courses/:course_number/satisfaction. return satisfaction data for each term */
router.get('/:course_number/satisfaction', utils.auth, function(req, res) {
  CoursesController.getCourseSatisfaction(req, res);
});

module.exports = router;

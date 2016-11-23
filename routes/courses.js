var express = require('express');
var router = express.Router();
var utils = require('../utils.js');

var CoursesController = require('../controllers/CoursesController');

/** get route for /courses/:course_number. display the course page */
router.get('/:course_number', utils.auth, function(req, res) {
  CoursesController.getCourseInfo(req, res);
});

module.exports = router;

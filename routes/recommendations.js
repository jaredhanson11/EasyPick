var express = require('express');
var router = express.Router();
var utils = require('../utils.js');
var Courses = require("../models/course.js");

var defaultRecs = ['6.170', '6.828', '6.006', '6.837'];

router.get('/courses', function(req, res) {
	Courses.getCourseInformation(defaultRecs, req, res);
});

module.exports = router;

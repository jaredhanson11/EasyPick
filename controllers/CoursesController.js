/**
 * Contains methods for handling actions related to courses
 */
var utils = require('../utils.js');
var Courses = require("../models/course.js");
var mongoose = require('mongoose-q')(require('mongoose'));

var CoursesController = function() {
  var that = Object.create(CoursesController.prototype);

  /**
   * get course info for a course number
   * @param  {Object} req the course number must be in req.params.course_number
   * @param  {Object} res the response
   */
  that.getCourseInfo = function(req, res) {
    Courses.findOne({ course_numbers: req.params.course_number })
    .then(function(course) {
      if (!course)
        return utils.sendErrorResponse(res, 404, "Course not found");
      else
        return utils.sendSuccessResponse(res, course)
    }).catch(function(err) {
      return utils.errorRes(res, err);
    });

  }

  Object.freeze(that);
  return that;
}

module.exports = CoursesController();
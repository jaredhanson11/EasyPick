/**
 * Contains methods for handling courses actions
 *
 * Created by Famien and Lara
 */

var Courses = require('../models/course.js');
var Reviews = require('../models/review.js');
var Comments = require('../models/comment.js');
var Tags = require('../models/tag.js');
var utils = require('../utils.js');
var mongoose = require('mongoose-q')(require('mongoose'));
var q = require('q');

var CoursesController = function () {
    var that = Object.create(CoursesController.prototype);

    /**
     * searches courses with matching query paramters
     * @param {Object} req with req.body being what query we search with
     * @param {Object} res
     *
     * @return {Object} courses list of courses matching query parameters
     */
    that.search = function (req, res) {
        var query = {};
        Object.keys(req.body).forEach(function (key, index) {
            if (req.body[key] != 'any')//don't include 'null' values in query (match any"
                query[key] = req.body[key];
        });

        Courses.find(query)
            .exec(function (err, courses) {
                if (err) utils.errorRes(res, err);

                else {
                    q.all(courses.map(function (course) {
                        return Reviews.getStatsForCourse(course).then(function (stats) {
                            var courseObj = course.toObject();//Turn to object since we can't add to mongoose model
                            courseObj.stats = stats;
                            return courseObj;
                        });
                    })).then(function (coursesWithStats) {
                            return utils.sendSuccessResponse(res, coursesWithStats);

                        }
                    );
                }
            });
    };

    /**
     * get course info for a course number
     * @param  {Object} req the course number must be in req.params.course_number
     * @param  {Object} res the response
     */
    that.getCourseInfo = function (req, res) {
        Courses.findOne({course_numbers: req.params.course_number})
            .then(function (course) {
                if (!course)
                    return utils.sendErrorResponse(res, 404, "Course not found");
                else
                    return utils.sendSuccessResponse(res, course)
            }).catch(function (err) {
            return utils.errorRes(res, err);
        });
    };

    that.getCourseStats = function(req, res) {
        Courses.findOne({ course_numbers: req.params.course_number })
            .then(function(course) {
                if (!course)
                    return utils.sendErrorResponse(res, 404, "Course not found");
                else
                    return Reviews.getStatsForCourse(course._id);
            }).then(function(stats) {
                    return utils.sendSuccessResponse(res, stats);
            }).catch(function(err) {
                    return utils.sendErrorResponse(res, 500, "Unknown server error");
            });
    }

    that.getCourseSatisfaction = function(req, res) {
        Courses.findOne({ course_numbers: req.params.course_number })
            .then(function(course) {
                if (!course)
                    return utils.sendErrorResponse(res, 404, "Course not found");
                else
                    return Reviews.getSatisfactionPerTerm(course._id);
            }).then(function(stats) {
                    return utils.sendSuccessResponse(res, stats);
            }).catch(function(err) {
                    console.log(err);
                    return utils.sendErrorResponse(res, 500, "Unknown server error");
            });
    }


    that.getCourseComments = function(req, res) {
        Courses.findOne({ course_numbers: req.params.course_number })
            .then(function(course) {
                if (!course)
                    return utils.sendErrorResponse(res, 404, "Course not found");
                else
                    return Comments.find({course: course._id});
            }).then(function(comments) {
                    return utils.sendSuccessResponse(res, comments);
            }).catch(function(err) {
                    return utils.sendErrorResponse(res, 500, "Unknown server error");
            });
    }


    Object.freeze(that);
    return that;
};

module.exports = CoursesController();

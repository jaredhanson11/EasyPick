/**
 * Contains methods for handling courses actions
 *
 * Created by Famien and Lara
 */

var Courses = require('../models/course.js');
var Reviews = require('../models/review.js');
var Comments = require('../models/comment.js');
var utils = require('../utils.js');
var mongoose = require('mongoose-q')(require('mongoose'));
var q = require('q');

var CoursesController = function () {
    var that = Object.create(CoursesController.prototype);

    /**
     * searches courses with matching query parameters/
     * @param {Object} req with req.query being what query we search with
     * @param {Object} res
     *
     * @return {Object} courses list of courses matching query parameters
     */
    that.search = function (req, res) {
        var query = {};
        Object.keys(req.query).forEach(function (key, index) {
            if (req.query[key] != 'any')//don't include 'null' values in query (match any"
                query[key] = req.query[key];
        });

        Courses.find(query)
            .then(function (courses) {
                var promises = courses.map(function (course) {
                    return Reviews.getStatsForCourse(course).then(function (stats) {
                        var courseObj = course.toObject();//Turn to object since we can't add to mongoose model
                        courseObj.stats = stats;
                        return courseObj;
                    });
                })
                return q.all(promises);
            }).then(function (coursesWithStats) {
                    return utils.sendSuccessResponse(req, res, coursesWithStats);
            }).catch(function(err) {
                return utils.sendErrorResponse(req, res, 500, "Unknown server error");
            });
    };


    /**
     * get course info for all courses
     * @param  {Object} req the request
     * @param  {Object} res the response
     */
    that.getAllCourses = function (req, res) {
        Courses.find()
            .then(function (courses) {
                return utils.sendSuccessResponse(req, res, courses);
            }).catch(function (err) {
                return utils.sendErrorResponse(req, res, 500, "Unknown server error");
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
                    return utils.sendErrorResponse(req, res, 404, "Course not found");
                else
                    return utils.sendSuccessResponse(req, res, course)
            }).catch(function (err) {
                return utils.sendErrorResponse(req, res, 500, "Unknown server error");
            });
    };

    /**
     * get course stats for a course number
     * @param  {Object} req the course number must be in req.params.course_number
     * @param  {Object} res the response
     */
    that.getCourseStats = function(req, res) {
        Courses.findOne({ course_numbers: req.params.course_number })
            .then(function(course) {
                if (!course) {
                    utils.sendErrorResponse(req, res, 404, "Course not found");
                    utils.breakPromise();
                }
                else
                    return Reviews.getStatsForCourse(course._id);
            }).then(function(stats) {
                return utils.sendSuccessResponse(req, res, stats);
            }).catch(function(err) {
                if (err.status != 200)
                    return utils.sendErrorResponse(req, res, 500, "Unknown server error");
            });
    }

    /**
     * get course satisfaction per term for a course number
     * @param  {Object} req the course number must be in req.params.course_number
     * @param  {Object} res the response
     */
    that.getCourseSatisfaction = function(req, res) {
        Courses.findOne({ course_numbers: req.params.course_number })
            .then(function(course) {
                if (!course) {
                    utils.sendErrorResponse(req, res, 404, "Course not found");
                    utils.breakPromise();
                }
                else
                    return Reviews.getSatisfactionPerTerm(course._id);
            }).then(function(stats) {
                return utils.sendSuccessResponse(req, res, stats);
            }).catch(function(err) {
                if(err.status != 200)
                    return utils.sendErrorResponse(req, res, 500, "Unknown server error");
            });
    }

    /**
     * get course comments for a course number
     * @param  {Object} req the course number must be in req.params.course_number
     * @param  {Object} res the response
     */
    that.getCourseComments = function(req, res) {
        Courses.findOne({ course_numbers: req.params.course_number })
            .then(function(course) {
                if (!course) {
                    utils.sendErrorResponse(req, res, 404, "Course not found");
                    utils.breakPromise()
                }
                else
                    return Comments.find({course: course._id});
            }).then(function(comments) {
                return utils.sendSuccessResponse(req, res, comments);
            }).catch(function(err) {
                if(err.status != 200)
                    return utils.sendErrorResponse(req, res, 500, "Unknown server error");
            });
    }


    Object.freeze(that);
    return that;
};

module.exports = CoursesController();

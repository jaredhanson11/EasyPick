/**
 * Contains methods for handling courses actions
 *
 * Created by Famien and Lara
 */

var Courses = require('../models/course.js');
var Tags = require('../models/tag.js');
var utils = require('../utils.js');
var mongoose = require('mongoose-q')(require('mongoose'));

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
            .exec(function (err, results) {
                if (err) res.json({"err": true, 'message': err});

                else {
                    res.json({"success": true, 'courses': results});
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
            }).catch(function(err) {
                    return utils.errorRes(res, err);
            });
    };

    Object.freeze(that);
    return that;
};

module.exports = CoursesController();

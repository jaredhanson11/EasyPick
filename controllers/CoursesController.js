/**
 * Contains methods for handling courses actions
 *
 * Created by Famien Koko on 11/20/2016.
 */

var Course = require('../models/course');

var CoursesController = function () {
    var that = Object.create(CoursesController.prototype);


    /**
     * searches courses with matching query paramters
     * @param {Object} req
     * @param {Object} res
     *
     * @return {Object} courses list of courses matching query parameters
     */
    that.search = function (req, res) {

        Course.find(req.params.query)
            .populate('tags')
            .exec(function (err, results) {
                if (err) res.json({"err": true, 'message': err});

                else {
                    res.json({"success": true, 'courses': results});
                }
            });
    };

    Object.freeze(that);
    return that;
};

module.exports = UsersController();
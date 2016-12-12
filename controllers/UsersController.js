/**
 * Contains methods for handling user actions
 */
var utils = require('../utils.js');
var Users = require("../models/user.js");
var Reviews = require('../models/review.js');
var Courses = require('../models/course.js');
var Comments = require('../models/comment.js');
var Courses = require('../models/course.js');
var PeopleService = require('../services/PeopleService.js');
var MailService = require('../services/MailService.js');

var mongoose = require('mongoose-q')(require('mongoose'));

var recommender = require('likely');

var UsersController = function() {
    var that = Object.create(UsersController.prototype);

    /**
    * if kerberos exists on people's directory. creates a new user with the given
    * kerberos and sends them an activation email
    * @param  {Object} req the kerberos and password must be in req.body
    * @param  {Object} res the response
    */
    that.signup = function(req, res) {
        // check if user forgot to add a field
        if (!(req.body.kerberos && req.body.password))
            return utils.sendErrorResponse(req, res, 400, "Missing field");

        PeopleService.person(req.body.kerberos, function(data, error) {
            // people service failed
            if (error)
                return utils.sendErrorResponse(req, res, 500, error.message);

            var user = data.person;

            if (!user)
                return utils.sendErrorResponse(req, res, 400, "Invalid kerberos");

            Users.create({
                first_name: user.givenName,
                last_name: user.familyName,
                kerberos: user.kerberosId,
                password: req.body.password,
            }).then(function(user) {
                MailService.sendConfirmationEmail(user, function(email_res) {
                    if (email_res.success)
                        return utils.sendSuccessResponse(req, res, {});

                    return utils.sendErrorResponse(req, res, 400, "Failed to send confirmation email");
                });
            }).catch(function(err) {
                  // if email is already in use, warn user
                if (err.code === 11000)
                    return utils.sendErrorResponse(req, res, 400, "Email is in use");
                else if (err.name === "ValidationError")
                    return utils.sendErrorResponse(req, res, 400, err.message);
                else
                    return utils.sendErrorResponse(req, res, 500, err.message);
            });
        });
    };


    /**
     * activates an user with a given activation token
     * @param  {[type]} req activation token must be in req.params.token
     * @param  {[type]} res the response
     */
    that.activate = function(req, res) {
        Users.findOne({ token: req.params.token })
            .then(function(user) {
                if (!user)
                    return utils.sendErrorResponse(req, res, 500, "Invalid token");
                return Users.findByIdAndUpdate(user._id, { $set: { activated: true }});
            }).then(function(user) {
                if (user)
                    return utils.sendSuccessResponse(req, res, { userid: user._id });
            }).catch(function(err) {
                return utils.sendErrorResponse(req, res, 500, err.message);
            });
    }

    /**
     * gets current user's profile information
     * @param  {[type]} req the request
     * @param  {[type]} res the response
     */
    that.getProfile = function (req, res) {
        var user_id = req.session.user._id;
        var ret = {};
        Users.get_profile(user_id)
            .then(function(msg){
                if (!msg) {
                    utils.sendErrorResponse(req, res, 400, 'User profile does not exist, or you do not have access to it.')
                } else {
                    ret = msg;
                    return Reviews.getReviews(user_id);
                }
            }).then(function(reviews){
                ret.course_reviews = reviews;
                return utils.sendSuccessResponse(req, res, ret, req.csrfToken());
            }).catch(function(err){
                return utils.sendErrorResponse(req, res, 500, err.message);
            }).done();
    };

    /**
     * edits current user's profile information
     * @param  {[type]} req the request, updated information must be in req.body
     * @param  {[type]} res the response
     */
    that.editProfile = function(req, res) {
        var user_id = req.session.user._id;
        var changed_info = req.body;
        Users.edit_profile(user_id, changed_info)
            .then(function(edited_profile){
                return utils.sendSuccessResponse(req, res, {profile: edited_profile});
            }).catch(function(err){
                return utils.sendErrorResponse(req, res, 500, err.message);
            }).done();
    };

    /**
     * posts a review
     * @param  {[type]} req the request, review info must be in req.body.review_form
     *                      if review has comment, comment must be in req.body.comment
     * @param  {[type]} res the response
     */
    that.postReview = function(req, res) {
        var reviewForm = req.body.review_form;
        var comment_form = req.body.comment;
        reviewForm.reviewer = req.session.user._id;
        Reviews.findOne({'reviewer': reviewForm.reviewer, 'course': reviewForm.course},
                function(err, review){
                    if (review){ return utils.sendErrorResponse(req, res, 500, 'Already reviewed this course');}

                        Reviews.create({
                            course: mongoose.Types.ObjectId(reviewForm.course),
                            term: reviewForm.term,
                            year: reviewForm.year,
                            reviewer: mongoose.Types.ObjectId(reviewForm.reviewer),
                            class_hrs: reviewForm.class_hrs,
                            outside_hrs: reviewForm.outside_hrs,
                            content_difficulty: reviewForm.content_difficulty,
                            grading_difficulty: reviewForm.grading_difficulty,
                            overall_satisfaction: reviewForm.overall_satisfaction
                        }).then(function(review){
                            if (comment_form.content){
                                return Comments.create(comment_form)
                            }
                        }).then(function(comment){
                            return utils.sendSuccessResponse(req, res, {});
                        }).catch(function(err) {
                            return utils.sendErrorResponse(req, res, 500, "Unknown server error");
                        });
                })
    };

    /**
     * edits a review
     * @param  {[type]} req the request, review info must be in req.body.review_form
     * @param  {[type]} res the response
     */
    that.editReview = function(req, res) {
        var reviewForm = req.body.review_form;
        Reviews.findByIdAndUpdate(reviewForm._id, {$set: reviewForm},
                function(err, review){
                    if (err || !review){ return utils.sendErrorResponse(req, res, 500, 'Error, does this review exist');}
                    return utils.sendSuccessResponse(req, res, {});
                })
    };

    /**
     * get course recommendations for current user
     * @param  {[type]} req the response
     * @param  {[type]} res the request
     */
    that.getRecommendations = function (req, res) {
        var user = req.session.user;
        Reviews.find({reviewer: user._id})
            .then(function (reviews) {
                var reviews_courses = reviews.map(function (review) {
                    return review.course;
                });

                if (reviews.length > 0) {
                    Reviews.getRatingsMatrix("6")
                        .then(function (results) {
                            var matrix = results[0];
                            var users = results[1];
                            var courses = results[2];
                            var model = recommender.buildModel(matrix, users, courses);

                            var recs = model.recommendations(user._id.toString());
                            var course_rec_ids = recs.map(function (rec) {

                                return rec[0];
                            });

                            return Courses.find({_id: {$in: course_rec_ids}})
                        })
                        .then(function (courses) {
                            return utils.sendSuccessResponse(req, res, {courses: courses});
                        })
                        .catch(function (err) {
                            return utils.sendErrorResponse(req, res, 500, err.message);
                        })
                } else {
                    return utils.sendSuccessResponse(req, res, {courses: []});
                }
            }).catch(function(err) {
                return utils.sendErrorResponse(req, res, 500, err.message);
            });
    }

    /**
     * adds a course to current user's wishlist
     * @param  {[type]} req the response
     * @param  {[type]} res the request
     */
    that.postToWishlist = function(req, res){
        var user_id = req.session.user._id;
        var course_id = null;
        var course_number = req.body.courseNumber.toString();
        Courses.findOne({'course_numbers': course_number})
            .then(function(course) {
                if (!course){
                    return utils.sendErrorResponse(req, res, 400, 'No such course');
                }
                course_id = course._id.toString();
                return Users.findOne({'_id': user_id, 'wishlist': course_id})
            .then(function(user) {
                if (user){
                    throw new Error();
                }
                return Users.findByIdAndUpdate(user_id, {$push: {wishlist: course_id}})
            }).then(function(user){
                return utils.sendSuccessResponse(req, res, {addedCourse: course_number});
            }).catch(function(err) {
                return utils.sendErrorResponse(req, res, 500, err.message);
            });
      });
  };


    /**
     * removes a course from current user's wishlist
     * @param  {[type]} req the response
     * @param  {[type]} res the request
     */
    that.removeFromWishlist = function(req, res){
        var user_id = req.session.user._id;
        var course_number = req.body.courseNumber.toString();

        Courses.findOne({'course_numbers': course_number})
            .then(function(course) {
                if (!course){
                    return utils.sendErrorResponse(req, res, 400, 'No such course');
                }
                var course_id = course._id;
                return Users.findByIdAndUpdate(user_id, {$pull: {wishlist: course_id}})
            .then(function(user){
                return utils.sendSuccessResponse(req, res, {deletedCourse: course_number});
            }).catch(function(err) {
                return utils.sendErrorResponse(req, res, 500, err.message);
            });;
      });
  };

  Object.freeze(that);
  return that;
}


module.exports = UsersController();

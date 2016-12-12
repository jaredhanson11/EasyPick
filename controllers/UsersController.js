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
    * creates a new user and logs them in
    * @param  {Object} req the email and password must be in req.body
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
            else {
                var user = data.person;
                if (!user)
                    return utils.sendErrorResponse(req, res, 400, "Invalid kerberos");

                else {
                    Users.create({
                        first_name: user.givenName,
                        last_name: user.familyName,
                        kerberos: user.kerberosId,
                        password: req.body.password,
                    }).then(function(user) {
                        MailService.sendConfirmationEmail(user, function(email_res) {
                            if (email_res.success)
                                return utils.sendSuccessResponse(req, res, {});
                            else
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
                }
            }
        });
    };

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


  that.get_profile = function get_profile(req, res) {
    var user_id = req.session.user._id;
    var ret = {};
    Users.get_profile(user_id)
      .then(function(msg){
        if (!msg) {
          utils.errorRes(res, 'User profile does not exist, or you do not have access to it.')
        } else {
            ret = msg;
            return Reviews.get_reviews(user_id);
        }
      }).then(function(reviews){
          ret.course_reviews = reviews;
          res.json({
              success: true,
              msg: {profile: ret}
          });
    }).catch(function(err){
          console.log(err);
          utils.errorRes(res, err);
    }).done();
  };

  that.edit_profile = function(req, res) {
    var user_id = req.session.user._id;
    var changed_info = req.body;
    Users.edit_profile(user_id, changed_info)
      .then(function(edited_profile){
            res.json({
                success: true,
                msg: {profile: edited_profile}
            });
      }).catch(function(err){
          console.log(err);
          utils.errorRes(res, err);
      }).done();
  };

  that.post_review = function(req, res) {
      var review_form = req.body.reviewForm;
      var comment_form = req.body.comment;
      review_form.reviewer = req.session.user._id;
      console.log('POST /review: review_form:' , review_form);
      Reviews.create({
          course: mongoose.Types.ObjectId(review_form.course),
          term: review_form.term,
          year: review_form.year,
          reviewer: mongoose.Types.ObjectId(review_form.reviewer),
          class_hrs: review_form.class_hrs,
          outside_hrs: review_form.outside_hrs,
          content_difficulty: review_form.content_difficulty,
          grading_difficulty: review_form.grading_difficulty,
          overall_satisfaction: review_form.overall_satisfaction
      }, function(err, review){
        if (err){
          return utils.errorRes(res, "Couldn't post review");
        }
        if (comment_form.content){
            return Comments.create(comment_form, function(err, comment){
              if (err){
                  return utils.errorRes(res, "Couldn't post comment, but review was posted.");
              }
              return utils.successRes(res, "Success");
            });
        } else {
            return utils.successRes(res, "Success");
        }
      })
  };

    that.getRecommendations = function (req, res) {
        var user = req.session.user;
        Reviews.find({reviewer: user._id}).then(
            function (reviews) {
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
                            return utils.sendSuccessResponse(res, {courses: courses});
                        })
                        .catch(function (err) {
                            return utils.sendErrorResponse(res, 500, err.message);
                        })
                } else {
                    return utils.sendSuccessResponse(res, {courses: []});
                }
            }
        );
  }

  that.postToWishlist = function(req, res){
      var userId = req.session.user._id;
      var courseNumber = req.body.courseNumber.toString();
      console.log('POST users/wishlist: courseNumber: ' + courseNumber);
      Courses.findOne({'course_numbers': courseNumber}, function(err, course){
          if (err){
              return utils.sendErrorResponse(req, res, 400, 'No such course');
          }
          console.log(course);
          var courseId = course._id;
          Users.findByIdAndUpdate(userId, {$push: {wishlist: courseId}}, function(err, user){
              if (err){
                  return utils.sendErrorResponse(req, res, 400, "Couldn't update");
              }
              return utils.sendSuccessResponse(req, res, {addedCourse: courseNumber});
          });
      });
  };

  that.removeFromWishlist = function(req, res){
      var userId = req.session.user._id;
      var courseNumber = req.body.courseNumber.toString();
      console.log('DELETE users/wishlist?courseNumber=' + courseNumber);
      Courses.findOne({'course_numbers': courseNumber}, function(err, course){
          if (err){
              return utils.sendErrorResponse(req, res, 400, 'No such course');
          }
          var courseId = course._id;
          Users.findByIdAndUpdate(userId, {$pull: {wishlist: courseId}}, function(err, user){
              if (err){
                  return utils.sendErrorResponse(req, res, 400, "Couldn't update");
              }
              return utils.sendSuccessResponse(req, res, {deletedCourse: courseNumber});
          });
      });
  };

  Object.freeze(that);
  return that;
}


module.exports = UsersController();

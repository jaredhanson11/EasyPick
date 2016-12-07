/**
 * Contains methods for handling user actions
 */
var utils = require('../utils.js');
var Users = require("../models/user.js");
var Reviews = require('../models/review.js');
var Comments = require('../models/comment.js');

var mongoose = require('mongoose-q')(require('mongoose'));
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://walimu.easypick%40gmail.com:walimueasypick@smtp.gmail.com');
var UsersController = function() {
  var that = Object.create(UsersController.prototype);

  // TODO: change this to user passport
  /**
   * creates a new user and logs them in
   * @param  {Object} req the email and password must be in req.body
   * @param  {Object} res the response
   */
  that.signup = function(req, res) {
    // check if user forgot to add a field
    if (!(req.body.email && req.body.password))
      return utils.sendErrorResponse(res, 400, "Missing field");

    Users.create({
      email: req.body.email,
      password: req.body.password,
      token: Users.generateToken(),
    }).then(function(user) {
      req.session.user = user;
      sendEmail(user);
      return utils.sendSuccessResponse(res, { userid: user._id });
    }).catch(function(err) {
      // if email is already in use, warn user
      if (err.code === 11000)
        return utils.sendErrorResponse(res, 400, "Email is in use");
      else if (err.name === "ValidationError")
        return utils.sendErrorResponse(res, 400, err.message);
      else
        return utils.sendErrorResponse(res, 500, err.message);
    });
  };

  that.activate = function(req, res) {
    Users.findOne({ token: req.params.token })
        .then(function(user) {
          if (!user)
            return utils.sendErrorResponse(res, 500, "Invalid token");

          return Users.findByIdAndUpdate(user._id, { $set: { activated: true }});
        }).then(function(user) {
          if (user)
            return utils.sendSuccessResponse(res, { userid: user._id });
        }).catch(function(err) {
          return utils.sendErrorResponse(res, 500, err.message);
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
      console.log('POST /review: review_form:' + review_form);
      Reviews.create(review_form, function(err, review){
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

  Object.freeze(that);
  return that;
}

var sendEmail = function(user) {
  var siteUrl = "localhost:3000"
  var activationLink = siteUrl +'/activate?token=' + user.token;
  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: '"EasyPick 👥" <walimu.easypick@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: "Account activation", // Subject line
      text: "Account activation", // plaintext body
      html: '<b>Welcome to EasyPick</b><br />'
          + 'To activate your account, please click the following link: '
          + '<a href="' + activationLink + '">' + activationLink + '</a>',
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
}

module.exports = UsersController();

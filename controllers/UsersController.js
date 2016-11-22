/**
 * Contains methods for handling user actions
 */
var utils = require('../utils.js');
var Users = require("../models/user.js");
var Reviews = require('../models/review.js');

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
      return res.json({
            success: false,
            error: "Missing field!"
          });

    Users.create({
      email: req.body.email,
      password: req.body.password
    }, function(err, user) {
      if (err) {
        // if email is already taken, warn user
        if (err.code === 11000)
          return res.json({
            success: false,
            error: "Username is taken."
          });
        else
          return utils.errorRes(res, err);
      }
      else {
        req.session.user = user;
        return res.json({
          success: true,
          userid: user._id
        });
      }
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
          console.log(reviews);
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
      var review_form = req.body;
      review_form.reviewer = req.session.user._id;
      console.log(review_form);
      if (!Users.post_review(review_form)){
          utils.errorRes(res, "Coudln't post review");
      } else{
          utils.successRes(res, "Success"); 
      };

  };



  Object.freeze(that);
  return that;
}

module.exports = UsersController();

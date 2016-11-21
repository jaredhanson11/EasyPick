/**
 * Contains methods for handling user sessions
 */
var User = require("../models/user.js");
var utils = require("../utils.js");

var SessionsController = function() {
  var that = Object.create(SessionsController.prototype);

  /**
   * logs in a user with a given email.
   * if email is valid (non-empty), logs in with that email and
   * renders user's feed.
   * if email is not valid, redirects to login page with login error.
   * @param  {Object}   req  the email should be in req.body.email
   * @param  {Object}   res  the response
   */
  that.login = function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
      if (err) return utils.errorRes(res, err);

      if (user && user.authenticate(req.body.password)) {
        req.session.user = user;
        return res.json({
          success: true,
          userid: user._id
        });
      } else {
        return res.json({
          success: false,
          message: "Incorrect email or password!"
        });
      }
    });
  }

  /**
   * logs an user out and renders login page.
   * @param  {Object} req the request
   * @param  {Object} res the response
   */
  that.logout = function(req, res) {
    req.session.user = null;
    return res.json({
      success: true,
    });
  }

  Object.freeze(that);
  return that;
}

module.exports = SessionsController();

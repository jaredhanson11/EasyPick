/**
 * Contains methods for handling user actions
 */
var utils = require('../utils.js');
var Users = require("../models/user.js");

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

  Object.freeze(that);
  return that;
}

module.exports = UsersController();
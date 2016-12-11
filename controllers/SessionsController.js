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
        User.findOne({
            email: req.body.email
        }).then(function(user) {
            if (user && user.authenticate(req.body.password)) {
                req.session.user = user;
                return utils.sendSuccessResponse(res, { userid: user._id });
            } else {
                return utils.sendErrorResponse(res, 401, "Failed to authenticate.");
            }
        }).catch(function(err) {
            return utils.sendErrorResponse(res, 500, err.message);
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

/**
 * Contains methods for handling user sessions
 *
 * Created by Lara
 */
var User = require("../models/user.js");
var utils = require("../utils.js");

var SessionsController = function() {
    var that = Object.create(SessionsController.prototype);

    /**
     * logs in a user with a given kerberos.
     * @param  {Object}   req  the kerberos should be in req.body.kerberos
     * @param  {Object}   res  the response
     */
    that.login = function(req, res) {
        User.findOne({
            kerberos: req.body.kerberos
        }).then(function(user) {
            if (user && user.authenticate(req.body.password)) {
                req.session.user = user;
                return utils.sendSuccessResponse(req, res, { userid: user._id });
            } else {
                return utils.sendErrorResponse(req, res, 401, "Failed to authenticate.");
            }
        }).catch(function(err) {
            return utils.sendErrorResponse(req, res, 500, err.message);
        });
    }

    /**
     * logs an user out.
     * @param  {Object} req the request
     * @param  {Object} res the response
     */
    that.logout = function(req, res) {
        req.session.user = null;
        return utils.sendSuccessResponse(req, res, {});
    }

    Object.freeze(that);
    return that;
}

module.exports = SessionsController();

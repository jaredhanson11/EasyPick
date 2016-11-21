/**
 * utils methods
 */
var Utils = function() {
  var that = Object.create(Utils.prototype);

  /**
   * middleware for authorizing users.
   * if user is logged in, calls next middleware.
   * else, renders login page.
   * @param  {Object}   req  username is in req.session.username
   * @param  {Object}   res  the response
   * @param  {Function} next next middleware
   */
  that.auth = function(req, res, next) {
    if(req.session.user)
      next();
    else
      res.json({
        success: false,
        messsage: "user is not logged in"
      });
  }

  /**
   * issues a success response
   * @param  {Obejct} res the response
   * @param  {String} msg a message to send with the response
   */
  that.successRes = function(res, msg) {
    res.status(200).json({
      success: true,
      msg: msg
    }).end();
  };

  /**
   * issues a error response
   * @param  {Obejct} res the response
   * @param  {Object} err the error
   */
  that.errorRes = function(res, err) {
    var errcode = err.status || 500;
    res.status(errcode).json({
      success: false,
      err: err
    }).end();
  };

  Object.freeze(that);
  return that;
}

module.exports = Utils();
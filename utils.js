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
		else {
			return that.sendErrorResponse(req, res, 401, "User is not logged in");
		}
	}

	that.successRes = function(res, msg) {
		res.status(200).json({
			success: true,
			msg: msg
		}).end();
	};

	/**
	 * issues a error response
	 * @param  {Object} res the response
	 * @param  {Object} err the error
	 */
	that.errorRes = function(res, err) {
		var errcode = err.status || 500;
		res.status(errcode).json({
			success: false,
			err: err
		}).end();
	};

	/**
	 * sends an error response with success: false.
     * @param  {Object} req       the request
	 * @param  {Object} res       the response
	 * @param  {Int}    errorCode the error
	 * @param  {String} error     the error message
	 */
	that.sendErrorResponse = function(req, res, errorCode, error) {
		console.log(error);
		res.status(errorCode).json({
			success: false,
			error: error,
		}).end();
	};

	/**
	 * sends a success response
	 * @param  {Object} req       the request
	 * @param  {Object} res       the response
	 * @param  {Object} content   any contents sent in the server reply
	 */
	that.sendSuccessResponse = function(req, res, content, csrf) {
		res.status(200).json({
			success: true,
			content: content,
			csrf_token: csrf,
		}).end();
	};

	// TODO: make this more functional
	/**
	 * creates a matrix of all zeros
	 * @param  {int} 	rows number of rows in the matrix
	 * @param  {int} 	cols number of columns in the matrix
	 * @return {matrix}      a matrix filled with zeros
	 */
	that.createZeroMatrix = function(rows, cols) {
		var matrix = [];
		for(var i=0; i<rows; i++) {
				matrix[i] = [];
				for(var j=0; j<cols; j++) {
						matrix[i][j] = 0;
				}
		}

		return matrix;
	}

	that.breakPromise = function() {
		var err = new Error("Broke promise");
		err.status = 200;
		throw err;
	}

	that.dedup = function(arr) {
		return arr.filter(function(item, pos, self) {
			return arr.indexOf(item) == pos;
		});
	}

	Object.freeze(that);
	return that;
}

module.exports = Utils();
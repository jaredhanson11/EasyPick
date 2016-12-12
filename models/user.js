var mongoose = require('mongoose');
var mongooseQ = require('mongoose-q')(mongoose);
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var bcrypt = require('bcrypt');

// Other models users depends on
var Review = require('./review.js');
var Comment = require('./comment.js');
var Course = require('./course.js');

var SALT_ROUNDS = 10;

userSchema = mongoose.Schema ({
    first_name: {type: String, maxlength: 30},
    last_name: {type: String, maxlength: 30},
    kerberos: {type: String, maxlength: 50, required: true, index: { unique: true } },
    major1: {type: String, maxlength: 100},
    major2: {type: String, maxlength: 100},
    minor: {type: String, maxlength: 100},
    concentration: {type: String, maxlength: 30},
    graduation_year: {type: Number, min: 1900},
    course_reviews: [{type: mongoose.Schema.ObjectId, ref: 'Review'}],
    password: { type: String, required: true }, // only for mvp
    // post mvp: interests: {type: mongoose.Schema.ObjectId, ref: 'Interest'}
    activated: { type: Boolean, default: false },
    token: { type: String },
    wishlist: [{type: mongoose.Schema.ObjectId, ref: 'Course'}]
});

/** hashes password */
userSchema.pre('save', function(next) {
	var user = this;
	bcrypt.hash(user.password, SALT_ROUNDS).then(function(hash) {
		user.password = hash;
		next();
	});
});

/** generates authentication token */
userSchema.pre('save', function(next) {
	var user = this;
	user.token = generateToken();
	next();
});

/**
 * authenticates an user
 * @param  {String} pass user's plaintest password
 * @return {boolean}     true, if authentication succeds, false otherwise
 */
userSchema.methods.authenticate = function(pass) {
	return bcrypt.compareSync(pass, this.password);
};

/**
 * returns user profile information
 * @param {} user
 * @return {JSON or Boolean} json user object, or false if user_id doesn't exist
 */
userSchema.statics.get_profile = function(user_id) {
	return this.findById(user_id).populate('wishlist')
			.execQ();
};

userSchema.statics.edit_profile = function(user_id, modified){
	return this.findOneAndUpdate({'_id': user_id}, {$set: modified})
			.execQ();
};


/**
 * generates a random token
 */
var generateToken = function() {
	var chars = "_!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
	var token = new Date().getTime() + '_';
	for ( var x = 0; x < 16; x++ ) {
		var i = Math.floor( Math.random() * 62 );
		token += chars.charAt( i );
	}
	return token;
};

userSchema.plugin(deepPopulate);

module.exports = mongoose.model('User', userSchema);

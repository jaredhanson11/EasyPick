var mongoose = require('mongoose');

var mongooseQ = require('mongoose-q')(mongoose);
var deepPopulate = require('mongoose-deep-populate')(mongoose);

// Other models users depends on
var Review = require('./review.js');
var Comment = require('./comment.js');
var Course = require('./course.js');

userSchema = mongoose.Schema ({
    first_name: {type: String, maxlength: 30},
    last_name: {type: String, maxlength: 30},
    email: {type: String, maxlength: 50, required: true, index: { unique: true } },
    major1: {type: String, maxlength: 100},
    major2: {type: String, maxlength: 100},
    minor: {type: String, maxlength: 100},
    concentration: {type: String, maxlength: 30},
    graduation_year: {type: Number, min: 1900},
    course_reviews: [{type: mongoose.Schema.ObjectId, ref: 'Review'}],
    password: { type: String, required: true }, // only for mvp
    // post mvp: interests: {type: mongoose.Schema.ObjectId, ref: 'Interest'}
});


/**
 * authenticates an user
 * @param  {String} pass user's password
 * @return {boolean}      true, is passwords match. false, otherwise.
 */
userSchema.methods.authenticate = function(pass) {
  return pass === this.password;
};

/**
 * returns user profile information
 * @param {} user
 * @return {JSON or Boolean} json user object, or false if user_id doesn't exist
 */
userSchema.statics.get_profile = function(user_id) {
     return this.findById(user_id)
         .populate('course_reviews.course')
         .execQ();
};

userSchema.statics.edit_profile = function(user_id, modified){
    return this.findOneAndUpdate({'_id': user_id}, modified)
        .execQ();
};

userSchema.statics.post_review = function(review_form, cb){
  var new_review = Review(review_form);
  return new_review.save();
};

userSchema.plugin(deepPopulate);
module.exports = mongoose.model('User', userSchema);

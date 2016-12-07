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
    activated: { type: Boolean, default: false },
    token: { type: String }
});


/**
 * authenticates an user
 * @param  {String} pass user's password
 * @return {boolean}      true, is passwords match. false, otherwise.
 */
userSchema.methods.authenticate = function(pass) {
  return pass === this.password && this.activated;
};

/**
 * returns user profile information
 * @param {} user
 * @return {JSON or Boolean} json user object, or false if user_id doesn't exist
 */
userSchema.statics.get_profile = function(user_id) {
    return this.findById(user_id)
         .execQ();
};

userSchema.statics.edit_profile = function(user_id, modified){
    return this.findOneAndUpdate({'_id': user_id}, modified)
        .execQ();
};

userSchema.statics.post_review = function(review_form, cb){
  var new_review = new Review(review_form);
  var that = this;
  return new_review.save(function(err, result){
      if (err){
          console.log(err);
          return false;
      }
      return result;
  });
};

userSchema.statics.generateToken = function() {
  var chars = "_!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  var token = new Date().getTime() + '_';
  for ( var x = 0; x < 16; x++ ) {
    var i = Math.floor( Math.random() * 62 );
    token += chars.charAt( i );
  }
  return token;
};

/**
 * returns if a user email is in a valid mit email format.
 * ex: kerberos@mit.edu
 * @param  {String} email user email
 * @return {boolean}      true is email is valid, false otherwise.
 */
var validateEmail = function (email) {
  var re = /\S+@mit\.edu$/;
  return re.test(email);
}

/** validators */
userSchema.path('email').validate(validateEmail, 'Not an MIT email.');

userSchema.plugin(deepPopulate);

module.exports = mongoose.model('User', userSchema);

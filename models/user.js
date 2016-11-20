var mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema);

var express = require('express'); //Do I need this import statement
var mongoose = require('mongoose');

userSchema = mongoose.Schema ({
    first_name: {type: String, maxlength: 30}
    last_name: {type: String, maxlength: 30},
    email: {type: String, maxlength: 50},
    major1: {type: String, maxlength: 100},
    major2: {type: String, maxlength: 100},
    minor: {type: String, maxlength: 100},
    concentration: {type: String, maxlength: 30},
    graduation_year: {type: Number, min: 1900},
    course_reviews: [{type: mongoose.Schema.ObjectId, ref: 'Review'}]
    // post mvp: interests: {type: mongoose.Schema.ObjectId, ref: 'Interest'}
});

module.exports = mongoose.model('User', userSchema);

var express = require('express'); //Do I need this import statement
var mongoose = require('mongoose');

offeringSchema = mongoose.Schema ({
    term: {type: String, required: true},
    year: {type: Number, required: true},
    course: {type: mongoose.Schema.ObjectId, ref: 'Course'}
});

module.exports = mongoose.model('Offering', offeringSchema);


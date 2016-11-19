var express = require('express'); //Do I need this import statement
var mongoose = require('mongoose');

courseSchema = mongoose.Schema({
    name: {type: String},
    course_numbers: [{type: String}],
    department: [{type: Number}],
    units: {type: String},
    prereqs: [{type: String}],
    tags: [{type: mongoose.Schema.ObjectId, ref: 'Tag'}]
});

module.exports = mongoose.model('Course', courseSchema);

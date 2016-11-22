var mongoose = require('mongoose');

courseSchema = mongoose.Schema({
    name: {type: String},
    course_numbers: [{type: String}],
    department: [{type: Number}],
    description: {type: String},
    units: {type: String},
    prereqs: [{type: String}],
    tags: [{type: mongoose.Schema.ObjectId, ref: 'Tag'}]
});

// TODO: add a check to guarantee course numbers are unique.

module.exports = mongoose.model('Course', courseSchema);

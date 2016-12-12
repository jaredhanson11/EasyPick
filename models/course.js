var mongoose = require('mongoose');

courseSchema = mongoose.Schema({
    name: {type: String},
    course_numbers: [{type: String}],
    department: [{type: String}],
    description: {type: String},
    units: {type: String},
    total_units: {type: Number},
    prereqs: {type: String},
    tags: [{type: String}]
});

module.exports = mongoose.model('Course', courseSchema);

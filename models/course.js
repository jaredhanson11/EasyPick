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

// TODO: add a check to guarantee course numbers are unique.

courseSchema.statics.getCourseInformation = function(numbers, req, res) {
	this.find({course_numbers: { $in: numbers} }).exec(function(err, courses){
		if (err) {
			res.json({
    			success: false,
  			}).end();
		}
		else {
			res.json({
				success: true,
				courses: courses
			}).end();
		}
	});
}

module.exports = mongoose.model('Course', courseSchema);

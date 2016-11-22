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

courseSchema.statics.getCourseInformation = function(numbers, req, res) {
	this.find({course_numbers: { $in: numbers} }).exec(function(err, courses){
		if (err) {
			res.json({
    		success: false,
  			}).end();
		}
		else {
			var info = courses.map(function(course) {return [course.course_numbers, course.name, course.units, 3];});
			res.json({
				success: true,
				courseInfo: info
			}).end();
		}
	});
}

module.exports = mongoose.model('Course', courseSchema);

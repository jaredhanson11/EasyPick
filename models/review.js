var mongoose = require('mongoose');

reviewSchema = mongoose.Schema ({
    course: {type: mongoose.Schema.ObjectId, ref: 'Course'},
    term: {type: String}, //Fall, Spring, Summer, IAP
    year: {type: Number},
    reviewer: {type: mongoose.Schema.ObjectId, ref: 'User'},
    class_hrs: {type: Number, min: 0},
    outside_hrs: {type: Number, min: 0},
    content_difficulty: {type: Number, max: 7, min: 1},
    grading_difficulty: {type: Number, max: 7, min: 1},
    overall_satisfaction: {type: Number, max: 7, min: 1}
});

reviewSchema.statics.get_reviews = function(user_id){
    return this.find({reviewer: user_id}).populate('course').execQ();
}

module.exports = mongoose.model('Review', reviewSchema);

var mongoose = require('mongoose');

reviewSchema = mongoose.Schema ({
    offering: {type: mongoose.Schema.ObjectId, ref: 'Offering'},
    reviewer: {type: mongoose.Schema.ObjectId, ref: 'User'},
    class_hrs: {type: Number, min: 0},
    outside_hrs: {type: Number, min: 0},
    content_difficulty: {type: Number, max: 7, min: 1},
    grading_difficulty: {type: Number, max: 7, min: 1},
    overall_satisfaction: {type: Number, max: 7, min: 1}
});

module.exports = mongoose.model('Review', reviewSchema);

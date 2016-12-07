var mongoose = require('mongoose');

reviewSchema = mongoose.Schema ({
    course: {type: mongoose.Schema.ObjectId, ref: 'Course'},
    term: {type: Number}, //{1: 'IAP', 2: 'SPRING', 3; 'SUMMER', 4: 'FALL'} 
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

reviewSchema.statics.getStatsForCourse = function(course_id){
    return this.find({course: course_id})
                .then(function(reviews) {
                    return reviews.reduce(function(prev, cur) {
                        return addStats(prev, cur, reviews.length);
                    }, {
                        class_hrs: 0,
                        outside_hrs: 0,
                        content_difficulty: 0,
                        grading_difficulty: 0,
                        overall_satisfaction: 0,
                    });
                })
}

reviewSchema.statics.getSatisfactionPerTerm = function(course_id) {
    return this.find({course: course_id})
                .then(function(reviews) {
                    var stats = {};
                    var count = {};

                    reviews.forEach(function(review) {
                        stats[review.year] = stats[review.year] || 0;
                        count[review.year] = count[review.year] || 0;
                        stats[review.year] += review.overall_satisfaction;
                        count[review.year] += 1;
                    });

                    reviews.forEach(function(review) {
                        stats[review.year] = stats[review.year] / count[review.year];
                    });

                    return stats;
                });
}

var addStats = function(prev, cur, n) {
    prev.class_hrs += cur.class_hrs / n;
    prev.outside_hrs += cur.outside_hrs / n;
    prev.content_difficulty += cur.content_difficulty / n;
    prev.grading_difficulty += cur.grading_difficulty / n;
    prev.overall_satisfaction += cur.overall_satisfaction / n;

    return prev;
}

module.exports = mongoose.model('Review', reviewSchema);

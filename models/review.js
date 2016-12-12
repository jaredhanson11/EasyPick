/**
 * Created by Jared.
 */
var mongoose = require('mongoose');
var utils = require('../utils.js');

reviewSchema = mongoose.Schema ({
    course: {type: mongoose.Schema.ObjectId, ref: 'Course'},
    term: {type: Number}, //{1: 'IAP', 2: 'SPRING', 3; 'SUMMER', 4: 'FALL'}
    year: {type: Number, required: true},
    reviewer: {type: mongoose.Schema.ObjectId, ref: 'User'},
    class_hrs: {type: Number, max: 7, min: 1},
    outside_hrs: {type: Number, max:7, min: 1},
    content_difficulty: {type: Number, max: 7, min: 1},
    grading_difficulty: {type: Number, max: 7, min: 1},
    overall_satisfaction: {type: Number, max: 7, min: 1}
});

/**
 * gets a matrix of satisfaction ratings for courses in a given department.
 * the matrix contains the ratings of given by each user to each class.
 * the results array is of the form [matrix, users, course], were users and
 * courses are the labels for the rows and columns of the matrix, respectively.
 * @param  {string} department department of the courses to appear in the matrix
 */
reviewSchema.statics.getRatingsMatrix = function(department) {
    return this.find({ reviewer: {$ne: undefined }}) // ignore reviews not made by users (course evaluation reviews)
        .populate("course")
        .then(function(reviews) {
            var dep_reviews = reviews.filter(function(review) { return review.course.department.indexOf(department) >= 0; });//only use course 6 reviews
            var users = utils.dedup(dep_reviews.map(function(review) { return review.reviewer.toString() }));
            var courses = utils.dedup(dep_reviews.map(function(review) { return review.course._id.toString() }));
            var rec_matrix = utils.createZeroMatrix(users.length, courses.length);

            dep_reviews.forEach(function(review) {
                var useridx = users.indexOf(review.reviewer.toString());
                var courseidx = courses.indexOf(review.course._id.toString());
                rec_matrix[useridx][courseidx] = review.overall_satisfaction;
            });
            return [rec_matrix, users, courses];
        });
}

/**
 * get all reviews made by a user id
 * @param  {ObjectId} user_id user id of the reviewer
 */
reviewSchema.statics.getReviews = function(user_id){
    return this.find({reviewer: user_id}).populate('course').execQ();
}

/**
 * get review statistics for a given course id
 * @param  {ObjectId} course_id course id of the reviewed course
 */
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

/**
 * get satisfaction review statistics for a given course id broken down per term
 * @param  {ObjectId} course_id course id of the reviewed course
 */
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

                    Object.keys(stats).forEach(function(year) {
                        stats[year] = stats[year] / count[year];
                    });

                    return stats;
                });
}

/**
 * helper function to add class stats
 * @param {Object} prev previous added stats
 * @param {Object} cur  current stats to be added
 * @param {int}    n    total number of stats
 */
var addStats = function(prev, cur, n) {
    prev.class_hrs += cur.class_hrs / n;
    prev.outside_hrs += cur.outside_hrs / n;
    prev.content_difficulty += cur.content_difficulty / n;
    prev.grading_difficulty += cur.grading_difficulty / n;
    prev.overall_satisfaction += cur.overall_satisfaction / n;

    return prev;
}

module.exports = mongoose.model('Review', reviewSchema);

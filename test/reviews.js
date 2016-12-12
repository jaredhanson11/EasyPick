/**
 * Created by Lara.
 */
var assert = require("assert");
var mongoose = require("mongoose");
var Review = require("../models/review");
var User = require("../models/user");
var Course = require("../models/course");

describe("Review Model", function() {
  // The mongoose connection object.
  var con;
  var usertest1;
  var usertest2;
  var usertest3;
  var coursetest1;
  var coursetest2;

  // Before running any test, connect to the database.
  before(function(done) {
    con = mongoose.connect("mongodb://localhost/easypick-test", function() {
        done();
    });
  });

  // Delete the database before each test.
  beforeEach(function(done) {
    con.connection.db.dropDatabase(function() {
        done();
    });
  });

  // add a test user
  beforeEach(function(done) {
    User.create({
        kerberos: "test1",
        password: "passtest"
    }).then(function(user) {
        usertest1 = user._id;
        done();
    })
  });

  // add a second test user
  beforeEach(function(done) {
    User.create({
        kerberos: "test2",
        password: "passtest"
    }).then(function(user) {
        usertest2 = user._id;
        done();
    })
  });

  // add a third test user
  beforeEach(function(done) {
    User.create({
        kerberos: "test3",
        password: "passtest"
    }).then(function(user) {
        usertest3 = user._id;
        done();
    })
  });

  // adds a test course
  beforeEach(function(done) {
    Course.create({
        course_numbers: "6.170",
        department: "6"
    }).then(function(course) {
        coursetest1 = course._id;
        done();
    })
  });

  // adds a second test course
  beforeEach(function(done) {
    Course.create({
        course_numbers: "6.828",
        department: "6"
    }).then(function(course) {
        coursetest2 = course._id;
        done();
    })
  });

  // adds a review
  beforeEach(function(done) {
    Review.create({
        course: coursetest1,
        reviewer: usertest1,
        class_hrs: 1,
        outside_hrs: 2,
        content_difficulty: 3,
        grading_difficulty: 4,
        overall_satisfaction: 5,
        year: 2015,
    }).then(function(review) {
        done();
    });
  });

  // adds a second review
  beforeEach(function(done) {
    Review.create({
        course: coursetest1,
        reviewer: usertest2,
        class_hrs: 2,
        outside_hrs: 3,
        content_difficulty: 4,
        grading_difficulty: 5,
        overall_satisfaction: 6,
        year: 2016,
    }).then(function(review) {
        done();
    });
  });

  // adds a third review
  beforeEach(function(done) {
    Review.create({
        course: coursetest2,
        reviewer: usertest1,
        class_hrs: 2,
        outside_hrs: 3,
        content_difficulty: 4,
        grading_difficulty: 5,
        overall_satisfaction: 3,
        year: 2014,
    }).then(function(review) {
        done();
    });
  });

  // adds a third review
  beforeEach(function(done) {
    Review.create({
        course: coursetest2,
        reviewer: usertest3,
        class_hrs: 2,
        outside_hrs: 3,
        content_difficulty: 4,
        grading_difficulty: 5,
        overall_satisfaction: 1,
        year: 2014,
    }).then(function(review) {
        done();
    });
  });


  it("should get all reviews made by a given user", function(done) {
    Review.getReviews(usertest1)
          .then(function(reviews) {
            assert.equal(reviews.length, 2);
            done();
          });
  });

  it("should get zeros reviews if user has made no reviews", function(done) {
    Review.getReviews(mongoose.Types.ObjectId())
          .then(function(reviews) {
            assert.equal(reviews.length, 0);
            done();
          });
  });

  it("should get the correct stats for a course", function(done) {
    Review.getStatsForCourse(coursetest1)
          .then(function(stats) {
            assert.equal(stats.class_hrs, 1.5);
            assert.equal(stats.outside_hrs, 2.5);
            assert.equal(stats.content_difficulty, 3.5);
            assert.equal(stats.grading_difficulty, 4.5);
            assert.equal(stats.overall_satisfaction, 5.5);
            done();
          });
  });

  it("should contain the correct ratings in the ratings matrix for course 6", function(done) {
    Review.getRatingsMatrix("6")
          .then(function(results) {
            assert.deepEqual(results[2].sort(), [coursetest1.toString(), coursetest2.toString()].sort());
            assert.deepEqual(results[1].sort(), [usertest1.toString(), usertest2.toString(), usertest3.toString()].sort());
            var flatten = results[0].reduce(function(a, b) {
                            return a.concat(b);
                          }, []);
            assert.deepEqual(flatten.sort(), [0, 0, 1, 3, 5, 6]);
            done();
          });
  });


  it("should get the correct satisfaction per term for a course", function(done) {
    Review.getSatisfactionPerTerm(coursetest1)
          .then(function(stats) {
            assert.equal(stats[2016], 6);
            assert.equal(stats[2015], 5);
            assert.equal(stats[2014], undefined);
            done();
          });
  });


  it("should get average satisfaction per term for a course", function(done) {
    Review.getSatisfactionPerTerm(coursetest2)
          .then(function(stats) {
            assert.equal(stats[2016], undefined);
            assert.equal(stats[2015], undefined);
            assert.equal(stats[2014], 2);
            done();
          });
  });

});
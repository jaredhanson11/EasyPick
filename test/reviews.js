var assert = require("assert");
var mongoose = require("mongoose");
var Review = require("../models/review");
var User = require("../models/user");
var Course = require("../models/course");

describe("App", function() {
  // The mongoose connection object.
  var con;
  var usertest;

  // Before running any test, connect to the database.
  before(function(done) {
    con = mongoose.connect("mongodb://localhost/easypick-test", function() {
      done();
    });
  });

  // Delete the database before each test.
  beforeEach(function(done) {
    con.connection.db.dropDatabase(function() {
      // adds a test user

      User.create({
        email: "test@mit.edu",
        password: "passtest"
      }).then(function(user){
        usertest = user._id;
        return Course.create({ course_number: ["6.170"] });
      }).then(function(course) {
        coursetest = course._id;
        return Review.create({
          course: coursetest,
          reviewer: usertest,
          class_hrs: 1,
          outside_hrs: 1,
          content_difficulty: 1,
          grading_difficulty: 1,
          overall_satisfaction: 1
        })
      }).then(function(r1) {
        return Review.create({
          course: coursetest,
          reviewer: usertest,
          class_hrs: 7,
          outside_hrs: 7,
          content_difficulty: 7,
          grading_difficulty: 7,
          overall_satisfaction: 7
        })
      }).then(function(r2) {
          done();
      });
    });
  });

  describe("User", function() {
    it("should return a the proper stats for a course", function(done) {
      Review.getStatsForCourse(coursetest)
        .then(function(stats) {
          assert.equal(stats.class_hrs, 4);
          assert.equal(stats.outside_hrs, 4);
          assert.equal(stats.content_difficulty, 4);
          assert.equal(stats.grading_difficulty, 4);
          assert.equal(stats.overall_satisfaction, 4);
          done();
        }).catch(function(err) {
          assert(false);
          done();
        });
    });
  });
}); // End describe App.
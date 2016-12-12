var assert = require("assert");
var mongoose = require("mongoose");
var mongooseQ = require('mongoose-q')(mongoose);
var User = require("../models/user");
var Course = require("../models/course");
var Review = require("../models/review");

describe("User Model", function() {
  // The mongoose connection object.
  var con;
  var usertest;
  var course;

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
      Course.create({name: 'Software Studio', course_numbers: ['6.170']})
        .then(function(course) {
            course = course
            return course;
        }).then(function(course){
            return User.create({kerberos: 'usertest', password: 'passtest', wishlist: [mongoose.Types.ObjectId(course._id)]})
        }).then(function(user){
            usertest = user;
            done();
        })
    });
  });

  it("should not store plaintext password", function(done) {
    assert.notEqual(usertest.password, 'passtest');
    done();
  });

  it("should succeed authentication with correct password", function(done) {
    assert.equal(usertest.authenticate("passtest"), true);
    done();
  });

  it("should fail authentication with incorrect password", function(done) {
    assert.equal(usertest.authenticate("wrong"), false);
    done();
  });

  it("should get profile after registering, leaving unknown information as null", function(done) {
    User.get_profile(usertest._id)
        .then(function(user){
            assert.equal(user.kerberos, 'usertest');
            assert.equal(user.graduation_year, null);
            done();
        }).catch(function(err){
            assert.equal(true,false);
        });
  });

  it("should get new profile after editing it, even with bad headers", function(done) {
    var modified = {'major1': 6, 'minor': 14, 'grad_year': 2018}
    User.edit_profile(usertest._id, modified)
        .then(function(user){
            return User.get_profile(usertest._id);
        }).then(function(user){
            assert.equal(user.major1, 6);
            assert.equal(user.minor, 14);
            assert.equal(user.graduation_year, null);
            assert.equal(user.grad_year, null);
            assert.equal(user.wishlist.length, 1);
            done();
        }).catch(function(err){
            assert.equal(true, false);
        });
  });

  it("should get new profile after editing it, populating wishlist", function(done) {
    var modified = {'major1': 6, 'minor': 14, 'graduation_year': 2018}
    User.edit_profile(usertest._id, modified)
        .then(function(user){
            return User.get_profile(usertest._id);
        }).then(function(user){
            assert.equal(user.major1, 6);
            assert.equal(user.minor, 14);
            assert.equal(user.graduation_year, 2018);
            assert.equal(user.wishlist.length, 1);
            assert.equal(user.wishlist[0].course_numbers[0], '6.170');
            done();
        }).catch(function(err){
            assert.equal(true, false);
        });
  });


  it("should get new profile after editing it", function(done) {
    var modified = {'major1': 6, 'minor': 14, 'graduation_year': 2018}
    User.edit_profile(usertest._id, modified)
        .then(function(user){
            return User.get_profile(usertest._id);
        }).then(function(user){
            assert.equal(user.major1, 6);
            assert.equal(user.minor, 14);
            assert.equal(user.graduation_year, 2018);
            assert.equal(user.wishlist.length, 1);
            done();
        }).catch(function(err){
            assert.equal(true, false);
        });
  });

});

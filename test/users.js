var assert = require("assert");
var mongoose = require("mongoose");
var mongooseQ = require('mongoose-q')(mongoose);
var User = require("../models/user");

describe("User Model", function() {
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
        kerberos: "usertest",
        password: "passtest"
      }).then(function(user) {
          usertest = user;
          done();
      });
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
});
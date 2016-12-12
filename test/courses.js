/**
 * Created by Famien Koko on 12/12/2016.
 */
var assert = require("assert");
var mongoose = require("mongoose");
var Review = require("../models/review");
var User = require("../models/user");
var Course = require("../models/course");

describe("Course model", function() {
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
            // adds test courses

            Course.create(
                {
                    course_numbers: ["6.170"],
                    name: "Software Studio",
                    department: ["6"],
                    units: "12",
                    description: "Design and build cool web apps"
                })
                .then(function(course){
                    done();
                });

        });
    });

    describe("Course", function() {
        it("should return a the proper info for a course", function(done) {
            Course.findOne({course_numbers: ["6.170"]}).then(function(course){
                assert.deepEqual(course.name, 'Software Studio', "Wrong name");
                assert.deepEqual(course.units, '12');
                assert.deepEqual(course.description, 'Design and build cool web apps');
                done();
            }).catch(function(err) {
                console.log('err',err);
                assert(false);
                done();
            });
        });
    });
}); // End describe App.
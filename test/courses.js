/**
 * Created by Famien Koko on 12/12/2016.
 */
var assert = require("assert");
var mongoose = require("mongoose");
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
                    description: "Design and build cool web apps",
                    tags: ["web-dev"]
                })
                .then(function(course1){
                    Course.create({
                        course_numbers: ["6.824"],
                        name: "Distributed Systems",
                        department: ["6"],
                        units: "12",
                        description: "Design and build cool web apps"
                    })
                })
                .then(function(course2){
                    Course.create({
                        course_numbers: ["6.002"],
                        name: "Circuits",
                        department: ["6"],
                        units: "12",
                        description: "Build Circuits"
                    })
                })
                .then(function(course3){
                    done();
                });

        });
    });

    describe("Course", function() {
        it("should return a the proper info for a course", function(done) {
            Course.findOne({course_numbers: ["6.170"]}).then(function(course){
                assert.deepEqual(course.name, "Software Studio", "Incorrect course");
                assert.deepEqual(course.units, "12","Incorrect course");
                assert.deepEqual(course.description, "Design and build cool web apps","Incorrect course");
                done();
            }).catch(function(err) {
                assert(false);
                done();
            });
        });

        it("should search by units", function(done) {
            Course.find({units: "12"}).then(function(courses){
                assert.equal(courses.length, 3);
                done();
            }).catch(function(err) {
                assert(false);
                done();
            });
        });

        it("should search by tags", function(done) {
            Course.find({tags: ["web-dev"]}).then(function(courses){
                console.log("courses", courses);
                assert.equal(courses.length, 1);
                assert.equal(courses[0].name, "Software Studio","Incorrect course");
                done();
            }).catch(function(err) {
                assert(false);
                done();
            });
        });
    });
}); // End describe Course.
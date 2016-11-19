var express = require('express'); //Do I need this import statement
var mongoose = require('mongoose');

/*
 * This schema makes it easier to query for all classes that have a specific tag
 *  associated with it. Otherwise you'd have to query all classes and then check if the
 *  specific tag is in each of its tags array.
 *  tag options: HASS-A, HASS-H, HASS-S, CI-H, CI-HW, CI-M, REST, AUS, Departmental Lab
 **/
tagSchema = mongoose.Schema ({
    name: {type: String, required: true},
    courses: [{type: mongoose.Schema.ObjectId, ref: 'Course'}]
});

module.exports = mongoose.model('Tag', offeringSchema);

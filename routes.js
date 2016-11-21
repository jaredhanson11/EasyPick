/**
 * Created by Famien Koko on 11/20/2016.
 */
var express = require('express');
var router = express.Router();
var CoursesController = require('../controllers/CoursesController');
var mongoose = require('mongoose');

routes.get('/search', function (req, res) {
    CoursesController.search(req, res);
});

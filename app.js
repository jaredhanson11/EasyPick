var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var csrf = require('csurf');
var path = require('path');
var utils = require('./utils');

// database set up
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/easypick');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("database connected");
});

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret : '6170', resave : true, saveUninitialized : true }));


// set up view engine
app.set('views', path.join(__dirname, 'views'));

// set up routes
var routes = require('./routes/routes'); // these routes don't require csrf authentication
app.use('/', routes);

// enable csrf for the routes below
app.use(csrf({ cookie: true }));

var users = require('./routes/users');
app.use('/users', users);
var courses = require('./routes/courses');
app.use('/courses', courses);
var recommendations = require('./routes/recommendations');
app.use('/recommendations', recommendations);

// handle bad routes
app.use(function(req, res, next) {
  var err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// error handler for bad csrf token
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
  // if crsf token is bad, logout user
  req.session.user = null
  return utils.sendErrorResponse(req, res, 403, "Invalid CSRF token");
});

// error handler
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err,
        loggedIn: req.session.user
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {},
        loggedIn: req.session.user
    });
});

// starts listening on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log("Listening...");
});

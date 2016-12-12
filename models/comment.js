var mongoose = require('mongoose');

commentSchema = mongoose.Schema ({
    content: {type: String},
    course: {type: mongoose.Schema.ObjectId, ref: 'Course'},
});

module.exports = mongoose.model('Comment', commentSchema);

var mongoose = require('mongoose');

commentSchema = mongoose.Schema ({
    content: {type: String},
    course: {type: mongoose.Schema.ObjectId, ref: 'Course'},
    hashed_user: {type: Number} // This is the hashed user id
});

module.exports = mongoose.model('Comment', commentSchema);

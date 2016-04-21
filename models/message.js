// Model for message
var mongoose = require('mongoose');

module.exports = mongoose.model('Message',{
    username: String,
    content: String,
    email: String,
    time: Date
});
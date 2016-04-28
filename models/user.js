var mongoose = require('mongoose');
 
module.exports = mongoose.model('User',{
    username: String,
    password: String,
    email: String,
    gender: String,
    address: String,
    firstName: String,
    middleName: String,
    lastName: String,
    bio: String,
    birthday: Date
});
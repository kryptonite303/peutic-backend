var mongoose = require('mongoose');

function User() {
    this.model = mongoose.model('User',{
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
}

module.exports = function () {
    return new User();
}
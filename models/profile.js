var mongo = require('mongoskin');
var config = require('../config');
var db = mongo.db(config.mongodb.simpli, config.mongodb.settings);
db.bind('users');

function Profile() {
    this.getProfile = function (params, callback) {
        var _id = params._id;
        db.users.find({username: _id}).toArray(function (err, items) {
            if (err) {
                return callback(err);
            }
            return callback(null, items[0]);
        });
    }
}
module.exports = function () {
    return new Profile();
};
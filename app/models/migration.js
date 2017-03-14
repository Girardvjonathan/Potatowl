module.exports = function() {
    const User = require('./users');
    const users = require('./seeds');
    User.insertMany(users);
    console.log("Database migrated");
}

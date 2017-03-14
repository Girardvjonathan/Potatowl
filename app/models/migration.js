var User = require('./users');

function seedUsers() {
    const users = require('./seeds');
    for (var user in users) {
        var newUser = new User({
            name: user.name,
            email: user.email,
            username: user.username,
            password: user.password
        });
        User.createUser(newUser, function(err, user){
            if (err) throw err;
            console.log(user);
        });
    }
}

module.exports = function() {
    seedUsers();
    console.log("Database migrated");
}

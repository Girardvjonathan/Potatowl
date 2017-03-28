module.exports = function() {
    let User = require('./users');
    //
    // // init user
    let user1 = new User({
        name: 'user1',
        username: 'user1',
        password: "user1",
        email: "user1@mailinator.com",
        role: "admin",
    });

    // init user
    let user2 = new User({
        username: 'user2',
        name: 'user2',
        password: "user2",
        email: "user2@mailinator.com",
        role: "admin",
    });

    let user3 = new User({
        username: "john",
        name: "john",
        password: "123",
        email: "john@mailinator.com",
        role: "admin",
    });


    User.createUser(user1, function(err, user) {
        console.log(err)
    });
    User.createUser(user2, function(err, user) {
        console.log(user)
    });
    User.createUser(user3, function(err, user) {
        console.log(user)
    });

    console.log("Database migrated");
}

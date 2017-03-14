const User = require('./models/users');

module.exports = {
    getUser(id) {
        console.log("User ID: " + id);
        let user = User.find({id: id});
        console.log(user);
        return user;
    },
    createUser(newUser) {
        return User.insert(newUser);
    }
};
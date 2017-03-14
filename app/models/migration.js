module.exports = function() {
    let User = require('./users');

    // init user
    let user1 = new User({
        id: 1,
        name: 'user1',
        password: "user1",
        email: "user1@mailinator.com",
        id_series: [0, 1, 2],
        id_watched_episodes: [0, 1, 2],
        created_at: Date.now(),
        updated_at: Date.now(),
    });

    // init user
    let user2 = new User({
        id: 2,
        name: 'user2',
        password: "user2",
        email: "user2@mailinator.com",
        id_series: [0, 1, 2],
        id_watched_episodes: [0, 1, 2],
        created_at: Date.now(),
        updated_at: Date.now(),
    });

    let list = [user1, user2];
    User.insertMany(list);

    console.log("Database migrated");
}

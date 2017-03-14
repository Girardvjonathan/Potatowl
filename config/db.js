const mongoose = require('mongoose');

module.exports = {
    connect(callback) {
        const username = 'stapp-admin';
        const password = 'youareapirate';
        const mongodbUri = 'mongodb://' + username + ':' + password + '@ds123050.mlab.com:23050/potatowl-db';

        mongoose.connect(mongodbUri);
        let conn = mongoose.connection;
        conn.on('error', console.error.bind(console, 'connection error:'));
        conn.once('open', function() {
            console.log("Database connection established");
            callback();
        });
    }
};

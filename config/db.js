module.exports = {
    connectDB: function(callback) {
    "use strict";
        let username = 'stapp-admin';
        let password = 'youareapirate';
        let mongodbUri = 'mongodb://' + username + ':' + password + '@ds123050.mlab.com:23050/potatowl-db';

        let mongoose = require('mongoose');
        mongoose.connect(mongodbUri);

        let conn = mongoose.connection;
        conn.on('error', console.error.bind(console, 'connection error:'));
        conn.once('open', function() {
            console.log("Database connection established");
            callback();
        });
    }
}

module.exports = {
    connectDB: function(callback) {
    "use strict";
        let username = 'stapp-admin';
        let password = 'youareapirate';
         let mongodbUri = 'mongodb://' + username + ':' + password + '@ds123050.mlab.com:23050/potatowl-db';
        // for local
        //let mongodbUri = "mongodb://localhost/potatowl-2";

        let mongoose = require('mongoose');
        mongoose.connect(mongodbUri);

        let conn = mongoose.connection;
        conn.on('error', console.error.bind(console, 'connection error:'));
        conn.once('open', function() {
            console.log("Database connection established");
            callback();
        });
    },

    migrateDB: function() {
        "use strict";
        let mongoose = require('mongoose');
        let Schema = mongoose.Schema;

        /************
         * Episodes *
         ************/
        let episodesSchema = new Schema({
            name: String,
            season: Number,
            episode: Number,
            air_on: Date
        });
        let Episode = mongoose.model('Episode', episodesSchema);

        // init episodes
        let fringeS01E01 = new Episode({ name: 'Fringe Season 1 Episode 1', season: 1, episode: 1 });
        let fringeS01E02 = new Episode({ name: 'Fringe Season 1 Episode 2', season: 1, episode: 2 });
        let fringeS01E03 = new Episode({ name: 'Fringe Season 1 Episode 3', season: 1, episode: 3 });
        let fringeS02E01 = new Episode({ name: 'Fringe Season 2 Episode 1', season: 2, episode: 1 });
        let gotS01E01 = new Episode({ name: 'Game of Thrones Season 1 Episode 1', season: 1, episode: 1 });
        let gotS02E01 = new Episode({ name: 'Game of Thrones Season 2 Episode 1', season: 2, episode: 1 });
        let gotS03E01 = new Episode({ name: 'Game of Thrones Season 3 Episode 1', season: 3, episode: 1 });
        let gotS04E01 = new Episode({ name: 'Game of Thrones Season 4 Episode 1', season: 4, episode: 1 });
        let gotS05E01 = new Episode({ name: 'Game of Thrones Season 5 Episode 1', season: 5, episode: 1 });
        let bbS01E01 = new Episode({ name: 'Breaking Bad Season 1 Episode 1', season: 1, episode: 1 });
        let bbS01E02 = new Episode({ name: 'Breaking Bad Season 1 Episode 2', season: 1, episode: 2 });
        let bbS01E04 = new Episode({ name: 'Breaking Bad Season 1 Episode 4', season: 1, episode: 4 });


        /**********
         * Series *
         **********/
        let seriesSchema = new Schema({
            name: String,
            year: Number,
            episodes: [episodesSchema]
        });
        let Series = mongoose.model('Series', seriesSchema);

        // init series
        let fringeSeries = new Series({ name: 'Fringe' });
        let gotSeries = new Series({ name: 'Game of Thrones' });
        let bbSeries = new Series({ name: 'Breaking Bad' });

        // add episodes to series
        fringeSeries.episodes.push(fringeS01E01);
        fringeSeries.episodes.push(fringeS01E02);
        fringeSeries.episodes.push(fringeS01E03);
        fringeSeries.episodes.push(fringeS02E01);

        gotSeries.episodes.push(gotS01E01);
        gotSeries.episodes.push(gotS02E01);
        gotSeries.episodes.push(gotS03E01);
        gotSeries.episodes.push(gotS04E01);
        gotSeries.episodes.push(gotS05E01);

        bbSeries.episodes.push(bbS01E01);
        bbSeries.episodes.push(bbS01E02);
        bbSeries.episodes.push(bbS01E04);


        /**********
         * Actors *
         **********/
        let actorsSchema = new Schema({
            name: String,
            birth_date: Date,
            episodes: [episodesSchema]
        });
        let Actor = mongoose.model('Actor', actorsSchema);

        // init actors


        // add actors to episodes


        /*********
         * Users *
         *********/
        let usersSchema = new Schema({
            username: String,
            email: String,
            series: [seriesSchema],
            watched_episodes: [episodesSchema],
            created_at: Date,
            updated_at: Date
        });
        let User = mongoose.model('User', usersSchema);

        // init user
        let user1 = new User({ username: 'User1'});

        // add series to user
        user1.series.push(fringeSeries);
        user1.series.push(gotSeries);
        user1.series.push(bbSeries);

        // add watched episodes to user
        user1.watched_episodes.push(fringeS01E01);
        user1.watched_episodes.push(gotS01E01);
        user1.watched_episodes.push(bbS01E01);
    }
}

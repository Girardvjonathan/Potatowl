module.exports = {
    sendNotifications: function() {
        const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const KEY = '?api_key=1b1497adc03fb28cf8df7fa0cdaed980';
        const CONFIG_DESC = 'https://api.themoviedb.org/3/tv/';

        var User = require('./models/users');
        var Like = require('./models/likes');
        var q = require('q');
        var https = require("https");
        var nodemailer = require('nodemailer');
        var smtpTransport = require('nodemailer-smtp-transport');

        var dayOfWeek = new Date().getDay();

        User.find({}, function(err, users) {
            if (!err){ 
                users.forEach(function(user) {
                    if (user.notificationsFrequency == 'DAILY' || (user.notificationsFrequency == 'WEEKLY' && dayOfWeek == 0)) {
                        Like.getUserLikes(user._id, function (err, followedSeries) {
                            if(!err) {
                                if (followedSeries && followedSeries.length > 0) {
                                    sendNotification(user.email, followedSeries, user.notificationsFrequency);
                                }
                            } else {
                                console.log('Unable to get liked series for user : ' + user._id + '. Error : ' + err);
                            }
                        });
                    }
                });
            } else {
                console.log('Unable to get users from the database. Error : ' + err);
            }
        });

        function sendNotification(email, followedSeries, frequency) {
            var promises = [];

            // Get the information about all followed series
            followedSeries.forEach(function(followedSerie) {
                promises.push(getSeriesInfo(followedSerie.serie_id).then(function(seriesInfo) {
                    return getLastSeasonInfo(seriesInfo);
                }));
            });

            var message = '';
            Promise.all(promises).then(function AcceptHandler(series) {
                series.forEach(function(serie) {
                    serie.lastSeason.episodes.forEach(function(episode) {

                        // Build the message
                        var airDate = new Date(episode.air_date.replace(/-/g, '/'));
                        if (frequency == 'WEEKLY' && isWithinTheWeek(airDate)) {
                            message += (serie.name + ' : ' + serie.lastSeason.name + ', Episode ' + episode.episode_number + ' will be aired this week on ' + DAYS[airDate.getDay()] + '.\n');
                        } else if (frequency == 'DAILY' && isToday(airDate)) {
                            message += (serie.name + ' : ' + serie.lastSeason.name + ', Episode ' + episode.episode_number + ' will be aired today.\n');
                        }
                    });
                });

                if (message.length == 0) {
                    var frequencyText = '';
                    if (frequency == 'WEEKLY') {
                        frequencyText = 'this week';
                    } else if (frequency == 'DAILY') {
                        frequencyText = 'today';
                    }
                    message = 'No TV show you are following will air new episodes ' + frequencyText + '.\n';
                }

                message = 'Good morning! Here is your STAPP automatic report :\n\n' + message;

                var transport = nodemailer.createTransport(smtpTransport({
                    service : "gmail",
                    auth : {
                        user : 'gti510stapp@gmail.com',
                        pass : 'STAPP510STAPP',
                    }
                }));

                var mailOptions = {
                    to : email,
                    from : 'Stapp Notifications <gti510stapp@gmail.com>',
                    subject : 'STAPP Series Report',
                    text : message
                };

                transport.sendMail(mailOptions, function(err) {
                    if (!err) {
                        console.log('Sent notification report to :' + email);
                    } else {
                        console.log('Unable to send email notification to : ' + email + '. Error : ');console.log(err);
                    }
                });
            }, function ErrorHandler(error) {
                console.log(error);
            });
        }

        function getSeriesInfo(seriesID) {
            var deferred  = q.defer();
            var req = https.get(CONFIG_DESC + seriesID + KEY, function (response) {
                var buffer = '';
                response.on('data', function (chunk) {
                    buffer += chunk;
                });

                response.on("end", function (err) {
                    var data = JSON.parse(buffer);
                    deferred.resolve(data);
                });
            });

            req.end();
            return deferred.promise;
        }

        function getLastSeasonInfo(seriesInfo) {
            var deferred  = q.defer();
            var req = https.get(CONFIG_DESC + seriesInfo.id + '/season/' + seriesInfo.number_of_seasons + KEY, function (response) {
                var buffer = '';
                response.on('data', function (chunk) {
                    buffer += chunk;
                });

                response.on("end", function (err) {
                    var data = JSON.parse(buffer);
                    seriesInfo.lastSeason = data;
                    deferred.resolve(seriesInfo);
                });
            });

            req.end();
            return deferred.promise;
        }

        function isWithinTheWeek(date) {
            var now = new Date();
            var limit = new Date(now);
            limit.setDate(now.getDate() + 6);
            limit.setHours(now.getHours() + 17);
            limit.setMinutes(now.getMinutes() + 55);
            return date >= now && date <= limit;
        }

        function isToday(date) {
            var now = new Date();
            reutrn (now.getFullYear() == date.getFullYear() && now.getMonth() == date.getMonth() && now.getDate() == date.getDate());
        }
    }
}

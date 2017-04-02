//Not used
var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Like = require('../models/likes');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// Get Homepage
router.post('/add', ensureAuthenticated, function(req, res) {
    var user_id = req.body.user_id;
    var serie_id = req.body.serie_id;

    // Validation
    if(!user_id ||!serie_id){
        res.status(400);
        res.send(JSON.stringify({"error":"missing field"}));
    } else {
        var newLike = new Like({
            user_id: user_id,
            serie_id: serie_id
        });

        Like.addLike(newLike, function(err, like){
            if(err) throw err;
            console.log(like);
        });

        return res.send(200);
    }
});

router.post('/remove', ensureAuthenticated, function(req, res) {
    var user_id = req.body.user_id;
    var serie_id = req.body.serie_id;

    // Validation
    if(!user_id || !serie_id){
        res.status(400);
        res.send(JSON.stringify({"error":"missing field"}));
    } else {
        Like.getLikeBySerieIdAndUserId(serie_id, user_id, function(err, like){
            if(err) throw err;
            if(like != null){
                like.remove();
            }
        });

        return res.send(200);
    }
});

router.get('/getAll', ensureAuthenticated, function(req, res) {
    var user_id = req.query.user_id;
    Like.getUserLikes(user_id,function (err, likes) {
        if(err) throw err;
        return res.send(JSON.stringify(likes));
    })
});

router.post('/sendNotification', ensureAuthenticated, function(req, res) {
    var serie_id = req.body.serie_id;
    var serie_name = req.body.serie_name;
    var message = req.body.message;

    // Validation
    if (!serie_id || !serie_name || !message) {
        res.status(400);
        res.send(JSON.stringify({"error": "missing field"}));
    } else {
        Like.find({serie_id: serie_id}, function(err, likes) {
            if (!err){ 
                likes.forEach(function(like) {
                    User.getUserById(like.user_id, function(err, user) {
                        if (!err && user) {
                            sendEmail(user.email, serie_name, message);
                        } else {
                            console.log('Could not find user with ID : ' + like.user_id);
                        }
                    });
                });
                return res.send(200);
            } else {
                console.log('Unable to get likes from the database. Error : ' + err);
                res.status(400);
                res.send(JSON.stringify({"error": "missing field"}));
            }
        });
    }
});

function sendEmail(email, serie_name, message) {
    var content = 'Hello! We have a special notification for you concerning : ' + serie_name + '\n\n' + message;

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
        subject : 'STAPP Special Notification',
        text : content
    };

    transport.sendMail(mailOptions, function(err) {
        if (!err) {
            console.log('Sent special notification to :' + email);
        } else {
            console.log('Unable to send special notification to : ' + email + '. Error : ');
        }
    });
}

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.status(401);
        res.send(JSON.stringify({"error":"not logged in"}));
    }
}

module.exports = router;
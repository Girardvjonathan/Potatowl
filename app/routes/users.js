var express = require('express');
var router = express.Router();
var passport = require('passport');
var async = require('async');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var bcrypt = require('bcryptjs');

const ONE_HOUR = 3600000;
var User = require('../models/users');

var nodemailer = require("nodemailer");

// Register User
router.post('/register', function(req, res) {
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		res.send(JSON.stringify({
			"failed" : "failed"
		}));
	} else {
		var newUser = new User({
			email : email,
			username : username,
			password : password
		});

		User.createUser(newUser, function(err, user) {
			if (err) {
				console.log(err);
			} else {
				req.login(user, function(err) {
					if (!err) {
						res.redirect('/');
					} else {
						console.log(err);
					}
				});
			}
		});
	}
});

passport.use(new LocalStrategy(
	function(username, password, done) {
		User.getUserByUsername(username, function(err, user) {
			if (err)
				throw err;
			if (!user) {
				return done(null, false, {
					message : 'Unknown User'
				});
			}

			User.comparePassword(password, user.password, function(err, isMatch) {
				if (err)
					throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, {
						message : 'Invalid password'
					});
				}
			});
		});
	}));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.getUserById(id, function(err, user) {
		done(err, user);
	});
});

router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			res.status(401);
			return res.send(JSON.stringify({
				message : "Username/password doesnt match anything in our system"
			}));
		}
		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			user['password'] = undefined;
			return res.send(JSON.stringify(user));
		});
	})(req, res, next);
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});


router.post('/forgot', function(req, res, next) {
	var email = req.body.email;
	console.log("inside the forgot route user: email: " + email);
	async.waterfall([
		function(done) {
			crypto.randomBytes(20, function(err, buf) {
				var token = buf.toString('hex');
				done(err, token);
			});
		},
		function(token, done) {
			User.findOne({
				email : req.body.email
			}, function(err, user) {
				if (!user) {
					console.log("no user found with: " + email);
					req.flash('error', 'No account with that email address exists.');
					return res.redirect('/forgot');
				}
				user.resetPasswordToken = token;
				user.resetPasswordExpires = Date.now() + ONE_HOUR;

				user.save(function(err) {
					done(err, token, user);
				});
			});
		},
		function(token, user, done) {
			var smtpTransport = require('nodemailer-smtp-transport');
			var smtpTransport = nodemailer.createTransport(smtpTransport({
				service : "gmail",
				auth : {
					user : 'gti510stapp@gmail.com',
					pass : 'STAPP510STAPP',
				}
			}));

			var mailOptions = {
				to : user.email,
				from : 'gti510stapp@gmail.com',
				subject : 'STAPP Password Reset',
				text : 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
					'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
					'http://' + req.headers.host + '/users/reset/' + token + '&' + user.email + '\n\n' +
					'If you did not request this, please ignore this email and your password will remain unchanged.\n'
			};

			smtpTransport.sendMail(mailOptions, function(err) {
				console.log("message send to :" + user.email);
				req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
				done(err, 'done');
			});
		}
	], function(err) {
		if (err) return next(err);
		res.redirect('/forgot');
	});
});

router.post('/resetPassword', function(req, res) {

	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	User.findOne({
		email : req.body.email
	}, function(err, user) {
		if (!user) {
			console.log('user ' + email + ' not found');
			return res.redirect('/resetPassword');
		}
		user.resetPasswordToken = undefined;
		user.resetPasswordExpires = undefined;

		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(password, salt, function(err, hash) {
				user.password = hash;
				user.save();
				return res.redirect('/login');
			});
		});
	});
});

router.get('/reset/:token&:email', function(req, res) {
	var email = req.params.email;
	User.findOne({
		resetPasswordToken : req.params.token,
		resetPasswordExpires : {
			$gt : Date.now()
		}
	}, function(err, user) {
		if (!user) {
			req.flash('error', 'Password reset token is invalid or has expired.');
			return res.redirect('/forgot');
		}

		res.redirect('/resetPassword/' + email);
	});
});

module.exports = router;
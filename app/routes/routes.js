module.exports = function(app) {
	// server routes ===========================================================

	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests

	// Get Homepage

	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});

	app.get("/isAuth", function(req, res, next) {
		if (req.isAuthenticated()) {
			res.status(200);
			return res.send(req.user);
		}
	});

	// Init db with user
	app.get('/initdb', function(req, res) {
		require('./../models/migration')();
		return res.send(JSON.stringify("ok"));
	});

	var users = require('./users');
	app.use('/users', users);

	var likes = require('./likes');
	app.use('/likes', likes);

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};
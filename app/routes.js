module.exports = function(app) {

	// server routes ===========================================================

	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});

    // Init db with user
    app.get('/initdb', function(req, res) {
        require('./models/migration')();
        res.sendfile('./public/index.html');
    });

};

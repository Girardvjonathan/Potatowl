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
        require('/app/models/migration')();
        res.sendfile('./public/index.html');
    });

    // app.post('/auth', function(req, res) {
    //     // res.setHeader('Content-Type', 'application/json');
    //     console.log("Asdoaksdokasodkasokd"+req.body.user);
    //     var user = req.body.user.username;
    //     var pass = req.body.user.password;
    //     res.send(JSON.stringify(req.body.user));
    //
    // 	// if(false)
    //     // res.sendfile('./public/index.html');
    // });

    var users = require('./users');
    app.use('/users', users);

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};

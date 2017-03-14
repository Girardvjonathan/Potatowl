module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
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

    // Get User
    app.get("/user", (req, res) => {
    	var id = req.body.id;
		id = 1; // pour debug
    	var result = require('./db').getUser(id);
        res.json(result);
    });

    /*
    // Create User
    app.post("/user", (req, res) => {
        //req.body.id = db.collection('users').size() + 1;
        db.collection('user').save(req.body, (err, result) => {
            if (err) res.sendStatus(400);
            res.json(result);
        })
    });

    // Update User
    app.update("/user", (req, res) => {
        db.collection('user').save(req.body, (err, result) => {
            if (err) res.sendStatus(400);
            res.json(result);
        })
    });
	*/
};

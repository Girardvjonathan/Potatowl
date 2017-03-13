const KEY = '?api_key=1b1497adc03fb28cf8df7fa0cdaed980';
const HOST = 'api.themoviedb.org';

module.exports = function(app) {

	// server routes ===========================================================
	app.get('/api/series/:id', function(req, res) {
		var http = require('http');

		var options = {
			host: HOST,
			path: '/3/tv/' + req.params.id + KEY
		};

		callback = function(response) {
			var data = '';

			response.on('data', function (chunk) {
				data += chunk;
			});

			response.on('end', function () {
				try {
					console.log(data);
					res.json(data);
				} catch (e) {
					console.log('Error parsing JSON!');
				}
			});
		}

		http.request(options, callback).end();
	});
	
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};

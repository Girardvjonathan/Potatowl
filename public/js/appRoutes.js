angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })

		.when('/series', {
			templateUrl: 'views/series.html',
			controller: 'SeriesController as media'
		});

		// .when('/geeks', {
		// 	templateUrl: 'views/geek.html',
		// 	controller: 'GeekController'
		// });

	$locationProvider.html5Mode(true);

}]);

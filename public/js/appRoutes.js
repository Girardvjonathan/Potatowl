angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/series', {
			templateUrl: 'views/series.html',
			controller: 'SeriesController as media'
		})

    .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchController as searchCtrl'
    });

		// .when('/geeks', {
		// 	templateUrl: 'views/geek.html',
		// 	controller: 'GeekController'
		// });

	$locationProvider.html5Mode(true);

}]);

angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider

    // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'MainController'
        })

        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'MainController'
        })

        .when('/series/:id', {
            templateUrl: 'views/seriesDetails.html',
            controller: 'SeriesDetailsController'
        })

        .when('/notification/:id/:name', {
            templateUrl: 'views/sendNotification.html',
            controller: 'NotificationController'
        })

        .when('/series', {
            templateUrl: 'views/series.html',
            controller: 'SeriesController'
        })

        .when('/search', {
            templateUrl: 'views/search.html',
            controller: 'SearchController'
        })

        .when('/likes', {
            templateUrl: 'views/seriesLiked.html',
            controller: 'SeriesLikedCtrl'
        })
        .when('/resetPassword/:email', {
            templateUrl: 'views/resetPassword.html',
            controller: 'ResetPasswordController'
        })
          .when('/register/:message', {
            templateUrl: 'views/register.html',
            controller: 'MainController'
        })
        .when('/forgot', {
            templateUrl: 'views/forgot.html',
            controller: 'ResetPasswordController'
        })
        .when('/seriesDetails', {
            templateUrl: 'views/seriesDetails.html',
            controller: 'SeriesLikedCtrl'
        });


    $locationProvider.html5Mode(true);

}]);

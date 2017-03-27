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
            controller: 'SeriesDetailsController as detailsCtrl'
        })

        .when('/series', {
            templateUrl: 'views/series.html',
            controller: 'SeriesController as media'
        })

        .when('/search', {
            templateUrl: 'views/search.html',
            controller: 'SearchController as searchCtrl'
        })

        .when('/likes', {
            templateUrl: 'views/seriesLiked.html',
            controller: 'SeriesLikedCtrl as liked'
        })
        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'MainController'
        })
        .when('/resetPassword/:email', {
            templateUrl: 'views/resetPassword.html',
            controller: 'ResetPasswordController as resetPasswordCtrl'
        })
        .when('/forgot', {
            templateUrl: 'views/forgot.html',
            controller: 'ResetPasswordController as resetPasswordCtrl'
        })
        .when('/seriesDetails', {
            templateUrl: 'views/seriesDetails.html',
            controller: 'SeriesLikedCtrl as likedCtrl'
        });


    $locationProvider.html5Mode(true);

}]);

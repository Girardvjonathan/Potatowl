(function (window) {
    'use strict';
    angular.module('shared', []);
    window.app = angular.module('app', ['ngRoute', 'appRoutes','shared','ResetPasswordCtrl', 'MainCtrl', 'SeriesCtrl', 'SeriesDetailsCtrl','SeriesService', 'SearchCtrl', 'SeriesLiked']);


})(window);
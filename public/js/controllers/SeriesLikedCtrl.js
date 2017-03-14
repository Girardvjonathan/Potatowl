(function () {
    'use strict';
    angular.module('SeriesLiked', []).controller('SeriesLikedCtrl', ['$http', '$q', '$scope', '$location', '$httpParamSerializer', TV]);
    function TV($http, $q, $scope, $location, $httpParamSerializer) {

        $scope.title = "Liked TV Shows";
        $scope.likedSeries = [];

        var init = function () {

            //    TODO : set $scope.likedSeries

        };

        $scope.getPosterMedium = function (url) {
            if (url === null) {
                return 'images/cover-placeholder.jpg';
            }
            return 'https://image.tmdb.org/t/p/w300' + url;
        };

        $scope.getPosterBig = function (url) {
            if (url === null) {
                return '';
            }
            return 'https://image.tmdb.org/t/p/w500/' + url;
        };

        $scope.getMoreInfo = function getMoreInfo(id) {
            console.log("go to description page")
        };

        init();
    }
})();

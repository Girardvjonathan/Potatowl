(function () {
    'use strict';
    angular.module('SeriesLiked', []).controller('SeriesLikedCtrl', ['$http', '$rootScope', '$q', '$scope', '$location', '$httpParamSerializer','$route', TV]);
    function TV($http, $rootScope, $q, $scope, $location, $httpParamSerializer, $route) {
        if(!$rootScope.user) {
            $location.path( "/login" );
        }
        $scope.title = "Liked TV Shows";
        $scope.likedSeries = [];
        const CONFIG_DESC = 'https://api.themoviedb.org/3/tv/';
        const KEY = '?api_key=1b1497adc03fb28cf8df7fa0cdaed980';

        var init = function () {
            var series = [];
            $scope.series = series;
            $rootScope.likes.forEach(function (value) {

               var promise = loadData(value);
                promise.then(function (data) {
                    series.push(data.data);
                }, function (reason) {
                    alert('Failed: ' + reason);
                    $("#spinner").hide();
                });
            });
        };

        function loadData(id) {
            var deferred = $q.defer();
            deferred.notify('Chargement de l\'information ');
            var deferred = $q.defer();
            $http.get(CONFIG_DESC + id + KEY).then(function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

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


        $scope.removeLiked = function (id) {
            var index = $rootScope.likes.indexOf(id.toString());
            if (index > -1) {
                $rootScope.likes.splice(index, 1);
            }

            $http({
                method: 'POST',
                url: '/likes/remove/',
                data: $.param({user_id: $rootScope.user._id, serie_id: id}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                //Remove the div from the user view
                // document.getElementById(id).innerHTML = "";
                $route.reload();
            }, function errorCallback(response) {
                $scope.errorMessage = response.data;
            });
        };

        init();
    }
})();

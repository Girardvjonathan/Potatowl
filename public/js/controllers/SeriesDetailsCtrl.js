(function () {
    'use strict';
    angular.module('SeriesDetailsCtrl', []).controller('SeriesDetailsController', ['$http', '$q', '$scope', '$httpParamSerializer', '$routeParams', '$location', '$rootScope', seriesDetails]);
    function seriesDetails($http, $q, $scope, $httpParamSerializer, $routeParams, $location, $rootScope) {
        if(!$routeParams.id) {
            $location.path( "/login" );
        }
        const KEY = '?api_key=1b1497adc03fb28cf8df7fa0cdaed980';
        const CONFIG_DESC = 'https://api.themoviedb.org/3/tv/';
        
        $rootScope.$watch('user', function(newValue, oldValue) {
            if(newValue){
                $scope.username = newValue.username;
                $scope.user = newValue;
            }
        });
        
        var init = function () {
            var infoPromise = loadData(CONFIG_DESC + $routeParams.id + KEY);
            infoPromise.then(function(data) {
                data = data.data;
 
                $scope.id = $routeParams.id;
                $scope.title = data.name;
                $scope.poster_path = 'https://image.tmdb.org/t/p/w500/' + data.poster_path;
                $scope.vote_average = data.vote_average;
                $scope.overview = data.overview;
                $scope.status = data.status;
                $scope.first_air_date = data.first_air_date;
                data.episode_run_time.sort();
                $scope.episode_run_times = data.episode_run_time.join(', ');
                $scope.status = data.status;
                
                var networks = '';
                data.networks.forEach(function(network) {
                    networks += network.name;
                    networks += ', ';
                });
                networks = networks.substring(0, networks.length - 2);
                $scope.networks = networks;
                
                var genres = '';
                data.genres.forEach(function(genre) {
                    genres += genre.name;
                    genres += ', ';
                });
                genres = genres.substring(0, genres.length - 2);
                $scope.genres = genres;

                $scope.seasons = [];
                for (var i = 0; i < data.seasons.length; i++) {
                    var season = data.seasons[i];
                    loadData(CONFIG_DESC + $routeParams.id + '/season/' + season.season_number + KEY).then(function(data) {
                        data = data.data;
                        $scope.seasons[data.season_number] = data;
                    }, function(reason) {
                            alert('Failed: ' + reason);
                            $("#spinner").hide();
                    });
                }
            }, function(reason) {
                    alert('Failed: ' + reason);
                    $("#spinner").hide();
            });
        };

        $scope.addLike = function () {
            $rootScope.likes.push($scope.id.toString());
            $http({
                method: 'POST',
                url: '/likes/add/',
                data: $.param({user_id: $rootScope.user._id, serie_id: $scope.id}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
            }, function errorCallback(response) {
                $scope.errorMessage = response.data;
            });
        };

        $scope.alreadyLiked = function() {
            if(!$rootScope.likes || $scope.id == undefined) return false;
            return $rootScope.likes.indexOf($scope.id.toString()) > -1;
        };
        

        $scope.removeLiked = function () {
            var index = $rootScope.likes.indexOf($scope.id.toString());
            if (index > -1) {
                $rootScope.likes.splice(index, 1);
            }

            $http({
                method: 'POST',
                url: '/likes/remove/',
                data: $.param({user_id: $rootScope.user._id, serie_id: $scope.id}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                $route.reload();
            }, function errorCallback(response) {
                $scope.errorMessage = response.data;
            });
        };
        
        function loadData(url) {
            var deferred = $q.defer();
            deferred.notify('Loading information');

            $http.get(url).then(function (data) {
                    deferred.resolve(data);
                },function(data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }

        init();
    }
})();

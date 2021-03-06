(function () {
    'use strict';
    angular.module('SeriesCtrl', []).controller('SeriesController', ['$http', '$q', '$scope', '$rootScope', '$location', '$httpParamSerializer', TV]);
    function TV($http, $q, $scope, $rootScope, $location, $httpParamSerializer) {
        $scope.title = "Popular TV Shows";
        if($location.search().query) $scope.title = "Results for \""+$location.search().query+"\"";

        const KEY = '?api_key=1b1497adc03fb28cf8df7fa0cdaed980';
        const CONFIG_URL = 'https://api.themoviedb.org/3/discover/tv' + KEY + '&page=';
        const CONFIG_DESC = 'https://api.themoviedb.org/3/tv/';
        const CONFIG_SEARCH = 'https://api.themoviedb.org/3/search/tv' + KEY + '&page=';
        $rootScope.$watch('user', function(newValue, oldValue) {
            if(newValue){
                $scope.username = newValue.username;
                $scope.user = newValue;
            }
        });

        var init = function () {
            $scope.page = 1;
            $scope.maxPage = 1;
            $scope.tv = [];
            var promise = loadData();
            promise.then(function (data) {
                data = data.data;
                $scope.media = data;
                $scope.maxPage = data.total_pages;
                $scope.page = data.page;
                $scope.totalResults = data.total_results;
            }, function (reason) {
                alert('Failed: ' + reason);
                $("#spinner").hide();
            });
        };

        function loadData() {
            var deferred = $q.defer();
            deferred.notify('Chargement de l\'information ');
            //TODO on a besoin de !! ?
            $http.get((!!$location.search().query ? CONFIG_SEARCH : CONFIG_URL ) + $scope.page + "&" + $httpParamSerializer($location.search())).then(function (data) {
                deferred.resolve(data);
            }, function (data, status, headers, config) {
                deferred.reject(status);
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

        $scope.onChange = function (number) {
            //switch case
            switch (number) {
                case 0:
                    if ($scope.page > 1) $scope.page--;
                    var promise = loadData();
                    promise.then(function (data) {
                        data = data.data;
                        $scope.media = data;
                        $scope.maxPage = data.total_pages;
                        $scope.page = data.page;
                        $scope.totalResults = data.total_results;
                    }, function (reason) {
                        alert('Failed: ' + reason);
                        $("#spinner").hide();
                    });
                    break;
                case 6:
                    if ($scope.page < $scope.maxPage) $scope.page++;
                    var promise = loadData();
                    promise.then(function (data) {
                        data = data.data;
                        $scope.media = data;
                        $scope.maxPage = data.total_pages;
                        $scope.page = data.page;
                        $scope.totalResults = data.total_results;
                    }, function (reason) {
                        alert('Failed: ' + reason);
                        $("#spinner").hide();
                    });
                    break;
                default:
                    if (number > 0 && number < $scope.maxPage) {
                        $scope.page = number;
                        var promise = loadData();
                        promise.then(function (data) {
                            data = data.data;
                            $scope.media = data;
                            $scope.maxPage = data.total_pages;
                            $scope.page = data.page;
                            $scope.totalResults = data.total_results;
                        }, function (reason) {
                            alert('Failed: ' + reason);
                            $("#spinner").hide();
                        });
                    }
            }
        };

        // https://api.themoviedb.org/3/tv/12?api_key=1b1497adc03fb28cf8df7fa0cdaed980
        $scope.getMoreInfo = function getMoreInfo(id) {
            $http.get(CONFIG_DESC + id + KEY).then(function (data) {
                $scope.overview = data.overview;
                $scope.tagline = data.tagline;
            });
        };
       
        
        $scope.addLike = function (id) {
            $rootScope.likes.push(id.toString());

            $http({
                method: 'POST',
                url: '/likes/add/',
                data: $.param({user_id: $rootScope.user._id, serie_id: id}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
            }, function errorCallback(response) {
                $scope.errorMessage = response.data;
            });
        };

        $scope.alreadyLiked = function(id) {
            if(!$rootScope.likes) return false;
            return $rootScope.likes.indexOf(id.toString()) > -1;
        };

        init();
    }
})();

angular.module('SearchCtrl', []).controller('SearchController', function ($location, $scope, $q, $http) {
    const KEY = '?api_key=1b1497adc03fb28cf8df7fa0cdaed980';
    const CONFIG_GENRES = 'https://api.themoviedb.org/3/genre/tv/list';

    var init = function () {
        var promise = loadGenres();
        promise.then(function(data) {
            $scope.genres = data.data.genres;
        }, function(reason) {
            conosle.log('Failed: ' + reason);
        });
    };

    function loadGenres() {
        var deferred = $q.defer();
        deferred.notify('Loading genres information');

        $http.get(CONFIG_GENRES + KEY).then(function (data) {
                deferred.resolve(data);
            },function(data, status, headers, config) {
                deferred.reject(status);
            });
        return deferred.promise;
    }

    $scope.searchByTitle = function () {
        if(!!$scope.searchParams) {
            if (!!$scope.searchParams.title) {
                $scope.searchParams['query'] = $scope.searchParams.title;
            }

            delete $scope.searchParams.title;
            delete $scope.searchParams.min_rating;
            delete $scope.searchParams.genres;
            delete $scope.searchParams.first_air_date;

            $location.path('/series').search($scope.searchParams);
        }
    }

    $scope.searchByCharacteristics = function () {
        if(!!$scope.searchParams) {
            if (!!$scope.searchParams.min_rating) {
                $scope.searchParams['vote_average.gte'] = $scope.searchParams.min_rating;
            }
            
            if (!!$scope.searchParams.genres) {
                var genres = '';

                for (var id in $scope.searchParams.genres) {
                    if ($scope.searchParams.genres[id]) {
                        genres += (id + ',');
                    }
                }
                
                if(genres.length > 0) {
                    genres = genres.substring(0, genres.length - 1)
                    $scope.searchParams['with_genres'] = genres;
                }
            }

            if (!!$scope.searchParams.first_air_date && !!$scope.searchParams.first_air_date.gte) {
                $scope.searchParams['first_air_date.gte'] = $scope.searchParams.first_air_date.gte;
            }

            if (!!$scope.searchParams.first_air_date && !!$scope.searchParams.first_air_date.lte) {
                $scope.searchParams['first_air_date.lte'] = $scope.searchParams.first_air_date.lte;
            }

            delete $scope.searchParams.title;
            delete $scope.searchParams.min_rating;
            delete $scope.searchParams.genres;
            delete $scope.searchParams.first_air_date;

            $location.path('/series').search($scope.searchParams);
        }
    }

    init();
});

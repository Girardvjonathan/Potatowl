angular.module('SearchCtrl', []).controller('SearchController', function ($location, $q, $http) {
    const KEY = '?api_key=1b1497adc03fb28cf8df7fa0cdaed980';
    const CONFIG_GENRES = 'https://api.themoviedb.org/3/genre/tv/list';

    var vm = this;

    var init = function () {
        var promise = loadGenres();
        promise.then(function(data) {
            vm.genres = data.data.genres;
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

    vm.searchByTitle = function () {
        if(!!vm.searchParams) {
            if (!!vm.searchParams.title) {
                vm.searchParams['query'] = vm.searchParams.title;
            }

            delete vm.searchParams.title;
            delete vm.searchParams.min_rating;
            delete vm.searchParams.genres;
            delete vm.searchParams.first_air_date;

            $location.path('/series').search(vm.searchParams);
        }
    }

    vm.searchByCharacteristics = function () {
        if(!!vm.searchParams) {
            if (!!vm.searchParams.min_rating) {
                vm.searchParams['vote_average.gte'] = vm.searchParams.min_rating;
            }
            
            if (!!vm.searchParams.genres) {
                var genres = '';

                for (var id in vm.searchParams.genres) {
                    if (vm.searchParams.genres[id]) {
                        genres += (id + ',');
                    }
                }
                
                if(genres.length > 0) {
                    genres = genres.substring(0, genres.length - 1)
                    vm.searchParams['with_genres'] = genres;
                }
            }

            if (!!vm.searchParams.first_air_date && !!vm.searchParams.first_air_date.gte) {
                vm.searchParams['first_air_date.gte'] = vm.searchParams.first_air_date.gte;
            }

            if (!!vm.searchParams.first_air_date && !!vm.searchParams.first_air_date.lte) {
                vm.searchParams['first_air_date.lte'] = vm.searchParams.first_air_date.lte;
            }

            delete vm.searchParams.title;
            delete vm.searchParams.min_rating;
            delete vm.searchParams.genres;
            delete vm.searchParams.first_air_date;

            $location.path('/series').search(vm.searchParams);
        }
    }

    init();
});

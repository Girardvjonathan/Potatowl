(function () {
    'use strict';
	angular.module('SeriesDetailsCtrl', []).controller('SeriesDetailsController', ['$http', '$q', '$scope', '$location', '$httpParamSerializer', '$routeParams', seriesDetails]);
	function seriesDetails($http, $q, $scope, $location, $httpParamSerializer, $routeParams) {
		const KEY = '?api_key=1b1497adc03fb28cf8df7fa0cdaed980';
		const CONFIG_DESC = 'https://api.themoviedb.org/3/tv/';

		var init = function () {
			var promise = loadData();
			promise.then(function(data) {
				data = data.data;
				// \"seasons\":[{\"air_date\":null,\"episode_count\":3,\"id\":6902,\"poster_path\":\"/6VmmiImmxcspyjcm4qKLGVYlPh6.jpg\",\"season_number\":0},
				//              {\"air_date\":\"2005-09-13\",\"episode_count\":22,\"id\":6904,\"poster_path\":\"/mRPD2mcsB4JULEX7BLt8xrcbDhI.jpg\",\"season_number\":1},
				//              {\"air_date\":\"2006-09-28\",\"episode_count\":22,\"id\":6905,\"poster_path\":\"/1cLvV3JYRojPZx1wJRAJM0LIvRX.jpg\",\"season_number\":2},
				//              {\"air_date\":\"2007-10-04\",\"episode_count\":16,\"id\":6906,\"poster_path\":\"/ibAwaBc2iMlOSVwAzbEqRGb2QT4.jpg\",\"season_number\":3},
				//              {\"air_date\":\"2008-09-18\",\"episode_count\":22,\"id\":6907,\"poster_path\":\"/3JGkbJoq715fSwfz8zl5GKMd28x.jpg\",\"season_number\":4},
				//              {\"air_date\":\"2009-09-10\",\"episode_count\":22,\"id\":6908,\"poster_path\":\"/c8EbnHu1tMvvQswzlvYC8iTSHtw.jpg\",\"season_number\":5},
				//              {\"air_date\":\"2010-09-24\",\"episode_count\":22,\"id\":6909,\"poster_path\":\"/nqvodxMQjxXfNkfUleX3b32ZHn0.jpg\",\"season_number\":6},
				//              {\"air_date\":\"2011-09-23\",\"episode_count\":23,\"id\":6910,\"poster_path\":\"/lGfhhIgmNkbGM7YBqoaMuTgXSnS.jpg\",\"season_number\":7},
				//              {\"air_date\":\"2012-10-03\",\"episode_count\":23,\"id\":6911,\"poster_path\":\"/rarQjXcftlKwOiK57UDcL4W6tFS.jpg\",\"season_number\":8},
				//              {\"air_date\":\"2013-10-08\",\"episode_count\":23,\"id\":6903,\"poster_path\":\"/bf2CWbGO3dRHbB20diAZ7IXUTqY.jpg\",\"season_number\":9},
				//              {\"air_date\":\"2014-06-02\",\"episode_count\":23,\"id\":62088,\"poster_path\":\"/8kI5hW0pL5LKLQSXd8LpWPyKDaN.jpg\",\"season_number\":10},
				//              {\"air_date\":\"2015-10-07\",\"episode_count\":23,\"id\":70169,\"poster_path\":\"/a2oroW2c2Xx0L67yajGGZA9uKU4.jpg\",\"season_number\":11},
				//              {\"air_date\":\"2016-10-13\",\"episode_count\":16,\"id\":78350,\"poster_path\":\"/rvI4VPpdI3vUCfwpHgYHMhfQAai.jpg\",\"season_number\":12}]}"
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
			}, function(reason) {
					alert('Failed: ' + reason);
					$("#spinner").hide();
			});
		};

		function loadData() {
			var deferred = $q.defer();
			deferred.notify('Chargement de l\'information ');

			$http.get(CONFIG_DESC + $routeParams.id + KEY).then(function (data) {
					deferred.resolve(data);
				},function(data, status, headers, config) {
					deferred.reject(status);
				});
			return deferred.promise;
		}

		init();
	}
})();

(function() {
	'use strict';
	angular.module('SeriesLiked', []).controller('SeriesLikedCtrl', [ '$http', '$rootScope', '$q', '$scope', '$location', '$httpParamSerializer', '$route', TV ]);
	function TV($http, $rootScope, $q, $scope, $location, $httpParamSerializer, $route) {
		if (!$rootScope.user) {
			$location.path("/login");
		}
		$scope.title = "Liked TV Shows";
		$scope.likedSeries = [];
		$scope.frequencies = [ "None", "Daily", "Weekly" ];

		const CONFIG_DESC = 'https://api.themoviedb.org/3/tv/';
		const KEY = '?api_key=1b1497adc03fb28cf8df7fa0cdaed980';

		var init = function() {
			var series = [];
			$scope.series = series;

			if ($rootScope.likes != null) {
				$rootScope.likes.forEach(function(value) {

					var promise = loadData(value);
					promise.then(function(data) {
						series.push(data.data);
					}, function(reason) {
						alert('Failed: ' + reason);
						$("#spinner").hide();
					});
				});
			}
		};

		function loadData(id) {
			var deferred = $q.defer();
			deferred.notify('Chargement de l\'information ');
			var deferred = $q.defer();
			$http.get(CONFIG_DESC + id + KEY).then(function(data) {
				deferred.resolve(data);
			});
			return deferred.promise;
		}

		$scope.saveOptions = function() {
			$http({
				method : 'POST',
				url : '/users/saveOptions/',
				data : $.param({
					email : $scope.user.email,
					frenquency : $scope.frequency,
					specialNotification : $scope.specialNotification
				}),
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			}).then(function successCallback(response) {
				console.log("Options saved");
			}, function errorCallback() {
				console.log("Options not saved");
			});
		}
		
		$scope.getPosterMedium = function(url) {
			if (url === null) {
				return 'images/cover-placeholder.jpg';
			}
			return 'https://image.tmdb.org/t/p/w300' + url;
		};

		$scope.getPosterBig = function(url) {
			if (url === null) {
				return '';
			}
			return 'https://image.tmdb.org/t/p/w500/' + url;
		};


		$scope.removeLiked = function(id) {
			var index = $rootScope.likes.indexOf(id.toString());
			if (index > -1) {
				$rootScope.likes.splice(index, 1);
			}

			$http({
				method : 'POST',
				url : '/likes/remove/',
				data : $.param({
					user_id : $rootScope.user._id,
					serie_id : id
				}),
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			}).then(function successCallback(response) {
				$route.reload();
			}, function errorCallback(response) {
				$scope.errorMessage = response.data;
			});
		};

		init();
	}
})();
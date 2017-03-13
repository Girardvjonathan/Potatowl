(function () {
    'use strict';
	angular.module('SerieCtrl', []).controller('SerieController',['$http','$q','$scope', '$location', '$httpParamSerializer', TV]);
	function serie($http, $q,$scope, $location, $httpParamSerializer) {
		$scope.title = "My title";
		const KEY = '?api_key=1b1497adc03fb28cf8df7fa0cdaed980';
		const CONFIG_DESC = 'https://api.themoviedb.org/3/tv/';

		var init = function () {
			var promise = loadData();
			promise.then(function(data) {
				data = data.data;
				$scope.serie = data; //Example JSON for Supernatural : "{\"backdrop_path\":\"/o9OKe3M06QMLOzTl3l6GStYtnE9.jpg\",\"created_by\":[{\"id\":58321,\"name\":\"Eric Kripke\",\"profile_path\":\"/8L3BdDXPMvcAS0wZAyfpA5Vlg3l.jpg\"}],\"episode_run_time\":[45],\"first_air_date\":\"2005-09-13\",\"genres\":[{\"id\":18,\"name\":\"Drama\"},{\"id\":9648,\"name\":\"Mystery\"},{\"id\":10765,\"name\":\"Sci-Fi & Fantasy\"}],\"homepage\":\"http://www.cwtv.com/shows/supernatural\",\"id\":1622,\"in_production\":true,\"languages\":[\"en\"],\"last_air_date\":\"2017-03-30\",\"name\":\"Supernatural\",\"networks\":[{\"id\":21,\"name\":\"The WB Television Network\"},{\"id\":71,\"name\":\"The CW\"}],\"number_of_episodes\":257,\"number_of_seasons\":12,\"origin_country\":[\"US\"],\"original_language\":\"en\",\"original_name\":\"Supernatural\",\"overview\":\"When they were boys, Sam and Dean Winchester lost their mother to a mysterious and demonic supernatural force. Subsequently, their father raised them to be soldiers. He taught them about the paranormal evil that lives in the dark corners and on the back roads of America ... and he taught them how to kill it. Now, the Winchester brothers crisscross the country in their '67 Chevy Impala, battling every kind of supernatural threat they encounter along the way. \",\"popularity\":43.154665,\"poster_path\":\"/3iFm6Kz7iYoFaEcj4fLyZHAmTQA.jpg\",\"production_companies\":[{\"name\":\"Warner Bros. Television\",\"id\":1957},{\"name\":\"Wonderland Sound and Vision\",\"id\":4022},{\"name\":\"Kripke Enterprises\",\"id\":38398},{\"name\":\"Supernatural Films\",\"id\":38399}],\"seasons\":[{\"air_date\":null,\"episode_count\":3,\"id\":6902,\"poster_path\":\"/6VmmiImmxcspyjcm4qKLGVYlPh6.jpg\",\"season_number\":0},{\"air_date\":\"2005-09-13\",\"episode_count\":22,\"id\":6904,\"poster_path\":\"/mRPD2mcsB4JULEX7BLt8xrcbDhI.jpg\",\"season_number\":1},{\"air_date\":\"2006-09-28\",\"episode_count\":22,\"id\":6905,\"poster_path\":\"/1cLvV3JYRojPZx1wJRAJM0LIvRX.jpg\",\"season_number\":2},{\"air_date\":\"2007-10-04\",\"episode_count\":16,\"id\":6906,\"poster_path\":\"/ibAwaBc2iMlOSVwAzbEqRGb2QT4.jpg\",\"season_number\":3},{\"air_date\":\"2008-09-18\",\"episode_count\":22,\"id\":6907,\"poster_path\":\"/3JGkbJoq715fSwfz8zl5GKMd28x.jpg\",\"season_number\":4},{\"air_date\":\"2009-09-10\",\"episode_count\":22,\"id\":6908,\"poster_path\":\"/c8EbnHu1tMvvQswzlvYC8iTSHtw.jpg\",\"season_number\":5},{\"air_date\":\"2010-09-24\",\"episode_count\":22,\"id\":6909,\"poster_path\":\"/nqvodxMQjxXfNkfUleX3b32ZHn0.jpg\",\"season_number\":6},{\"air_date\":\"2011-09-23\",\"episode_count\":23,\"id\":6910,\"poster_path\":\"/lGfhhIgmNkbGM7YBqoaMuTgXSnS.jpg\",\"season_number\":7},{\"air_date\":\"2012-10-03\",\"episode_count\":23,\"id\":6911,\"poster_path\":\"/rarQjXcftlKwOiK57UDcL4W6tFS.jpg\",\"season_number\":8},{\"air_date\":\"2013-10-08\",\"episode_count\":23,\"id\":6903,\"poster_path\":\"/bf2CWbGO3dRHbB20diAZ7IXUTqY.jpg\",\"season_number\":9},{\"air_date\":\"2014-06-02\",\"episode_count\":23,\"id\":62088,\"poster_path\":\"/8kI5hW0pL5LKLQSXd8LpWPyKDaN.jpg\",\"season_number\":10},{\"air_date\":\"2015-10-07\",\"episode_count\":23,\"id\":70169,\"poster_path\":\"/a2oroW2c2Xx0L67yajGGZA9uKU4.jpg\",\"season_number\":11},{\"air_date\":\"2016-10-13\",\"episode_count\":16,\"id\":78350,\"poster_path\":\"/rvI4VPpdI3vUCfwpHgYHMhfQAai.jpg\",\"season_number\":12}],\"status\":\"Returning Series\",\"type\":\"Scripted\",\"vote_average\":6.9,\"vote_count\":706}"
			}, function(reason) {
					alert('Failed: ' + reason);
					$("#spinner").hide();
			});
		};

		function loadData() {
			var deferred = $q.defer();
			deferred.notify('Chargement de l\'information ');

			$http.get(CONFIG_DESC + id + KEY).then(function (data) {
					deferred.resolve(data);
				},function(data, status, headers, config) {
					deferred.reject(status);
				});
			return deferred.promise;
		}

		$scope.getPosterBig = function (url) {
			if (url === null) {
				return '';
			}
			return 'https://image.tmdb.org/t/p/w500/' + url;
		};

		init();
	}
})();

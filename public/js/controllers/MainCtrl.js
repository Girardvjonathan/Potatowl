angular.module('MainCtrl', []).controller('MainController', function($timeout, $http, $routeParams, $scope, $location, $rootScope) {

	$scope.tagline = 'Series tracker application';

	function isAuth() {
		$http({
			method : 'GET',
			url : '/isAuth/',
			headers : {}
		}).then(function successCallback(response) {
			$scope.user = response.data;
			$rootScope.user = $scope.user;
			$scope.username = $scope.user.username;
			getLikes();
		}, function errorCallback() {});
	}
	
	if ($rootScope.user != null) {
		$scope.user = $rootScope.user;
	} else {
		isAuth();
	}
	
	
	if ($routeParams.message != null) {
		var msg = JSON.parse($routeParams.message);
		$rootScope.errorRegisterMessage = '';

		for (var i = 0; i < msg.length; i++) {
			$rootScope.errorRegisterMessage += msg[i]['msg'] += '  ';
		}
	}

	if ($rootScope.user != null) {
		$scope.username = $rootScope.user.username;
	} 

	if ($rootScope.likes) {
		if ($rootScope.likes != null) {
			$scope.numberSeries = $rootScope.likes.length;
		}
	}

	$scope.register = function() {
		$http({
			method : 'POST',
			url : '/users/register/',
			data : $.param({
				email : $scope.user.email,
				username : $scope.user.username,
				password : $scope.user.password,
				password2 : $scope.user.password2
			}),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).then(function successCallback(response) {
			$scope.errorMessage = "Registration success";
			$scope.user = response.data;
			$location.path("/login");
		}, function errorCallback(response) {
			console.log("Something happen when creating account");
		});
	};

	$scope.login = function(user) {

		$http({
			method : 'POST',
			url : '/users/login/',
			data : $.param({
				username : user.username,
				password : user.password
			}),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).then(function successCallback(response) {
			$rootScope.user = response.data;
			if ($rootScope.user != null) {
				$scope.username = $rootScope.user.username;
			}
			getLikes();
		}, function errorCallback() {
			$scope.errorMessage = "Username/password doesnt match anything in our system";
		});
	};


	function getLikes() {
		$http({
			method : 'GET',
			url : '/likes/getAll',
			headers : {
				'user_id' : $rootScope.user._id
			}
		}).then(function successCallback(response) {
			$rootScope.likes = valuesToArray(response.data);
			$rootScope.numberSeries = $rootScope.likes.length;
			if ($rootScope.user.role == "admin") {
				$location.path('/series');
			} else {
				$location.path('/likes');
			}
		}, function errorCallback() {
			$location.path('/');
			console.log("Something happen with the likes");
		});
	}
	
	$scope.logout = function() {
		$rootScope.likes == null;
		
		if($rootScope.user == null) {
			$scope.user == null;
			$location.path('/');
			return;
		}
		
		$http({
			method : 'GET',
			url : '/users/logout/',
			headers : {
				'user_id' : $rootScope.user._id
			}
		}).then(function successCallback(response) {
			$rootScope.user = null;
			$scope.user == null;
			$scope.timeInMs = 0;

		    var countUp = function() {
		        $scope.timeInMs+= 500;
		        $timeout(countUp, 500);
		    }

		    $timeout(countUp, 500);
			$location.path('/');
		
		}, function errorCallback() {
			$scope.errorMessage = "Something wrong happen";
			$location.path('/');
		});

	};

	function valuesToArray(obj) {
		return Object.keys(obj).map(function(key) {
			return obj[key]['serie_id'];
		});
	}
});
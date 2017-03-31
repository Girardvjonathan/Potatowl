angular.module('MainCtrl', []).controller('MainController', function($http, $routeParams, $scope, $location, $rootScope) {

	$scope.tagline = 'Series tracker application';

	if($routeParams.message != null){
		var msg = JSON.parse($routeParams.message);
		$rootScope.errorRegisterMessage = ''; 

		for (var i = 0; i < msg.length; i++) {
			console.log(i);
			$rootScope.errorRegisterMessage += msg[i]['msg'] += '  ';
		}
	}
	if($rootScope.user != null){
   	    $scope.user = $rootScope.user;
    }
	if($rootScope.user != null){
   	    $scope.username = $rootScope.user.username;
    } else if ($location.path() == "/profile") {
        $location.path( "/login" );
    }

    if($rootScope.likes) {
	    if($rootScope.likes != null){
	        $scope.numberSeries = $rootScope.likes.length;
	    }
    }
    
    $scope.register = function () {
        $http({
            method: 'POST',
            url: '/users/register/',
            data: $.param({email: $scope.user.email, username: $scope.user.username, password: $scope.user.password,  password2: $scope.user.password2}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         }).then(function successCallback(response) {
            $scope.errorMessage = "Registration success";
        }, function errorCallback(response) {
        	  console.log("Something happen");
        });
    }; 
    
    $scope.login = function (user) {

        $http({
            method: 'POST',
            url: '/users/login/',
            data: $.param({username: user.username, password: user.password}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         }).then(function successCallback(response) {
            $rootScope.user = response.data;
        	if($rootScope.user != null){
           	    $scope.username = $rootScope.user.username;
            }
        	
            $http({
                method: 'GET',
                url: '/likes/getAll',
                headers: {'user_id': $rootScope.user._id}
            }).then(function successCallback(response) {
                $rootScope.likes = valuesToArray(response.data);
                $rootScope.numberSeries = $rootScope.likes.length;
                if($rootScope.user.role == "admin"){
                    $location.path('/series');
                } else {
                    $location.path('/likes');
                }

            }, function errorCallback() {
                $scope.errorMessage = "Oops ?";
            });


        }, function errorCallback() {
            $scope.errorMessage = "Username/password doesnt match anything in our system";
        });
    };

    $scope.logout = function () {
        $http({
            method: 'GET',
            url: '/users/logout/',
            headers: {'user_id': $rootScope.user._id}
       }).then(function successCallback(response) {
      		$rootScope.user = null;
      		$location.path('/');
        }, function errorCallback() {
            $scope.errorMessage = "Something wrong happen";
        });
    };
    
    function valuesToArray(obj) {
        return Object.keys(obj).map(function (key) { return obj[key]['serie_id']; });
    }
});
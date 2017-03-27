angular.module('MainCtrl', []).controller('MainController', function($http, $scope, $location, $rootScope) {

	$scope.tagline = 'Series tracker application';
	
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
                $location.path('/likes');

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
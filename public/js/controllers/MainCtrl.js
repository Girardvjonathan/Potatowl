angular.module('MainCtrl', []).controller('MainController', function($http, $scope, $location, $rootScope) {

	$scope.tagline = 'To the moon and back!';

    // var error = $location.search().error;
	// if(error) {
	// 	$scope.errorMessage = "Username/password doesnt match anything in our system"
	// }
    if($rootScope.likes) {
	    if($rootScope.likes != null){
	        $scope.numberSeries = $rootScope.likes.length;
	    }
        if($rootScope.user != null){
       	    $scope.name = $rootScope.user.name;
        }
    }

    $scope.login = function (user) {
        $http({
            method: 'POST',
            url: '/users/login/',
            data: $.param({username: user.username, password: user.password}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         }).then(function successCallback(response) {
            // User.setUser(response.data);
            // var auth = "Basic " + btoa(user.username + ':' + user.password);
            // $cookies.put('session', auth);
            // $http.defaults.headers.common.Authorization = auth;
			console.log("ho hi",response.data);
            $rootScope.user = response.data;
            // Get all liked series
            $http({
                method: 'GET',
                url: '/likes/getAll',
                headers: {'user_id': $rootScope.user._id}
            }).then(function successCallback(response) {
                // User.setUser(response.data);
                // var auth = "Basic " + btoa(user.username + ':' + user.password);
                // $cookies.put('session', auth);
                // $http.defaults.headers.common.Authorization = auth;
                $rootScope.likes = valuesToArray(response.data);
                $rootScope.numberSeries = $rootScope.likes.length;

                console.log("My likes are",$rootScope.likes);
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
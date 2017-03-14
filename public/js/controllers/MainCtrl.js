angular.module('MainCtrl', []).controller('MainController', function($http, $scope, $location, $rootScope) {

	$scope.tagline = 'To the moon and back!';

    // var error = $location.search().error;
	// if(error) {
	// 	$scope.errorMessage = "Username/password doesnt match anything in our system"
	// }
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
            $location.path('/likes');

        }, function errorCallback() {
            $scope.errorMessage = "Username/password doesnt match anything in our system";
        });

    };
});
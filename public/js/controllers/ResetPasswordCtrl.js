angular.module('ResetPasswordCtrl', []).controller('ResetPasswordController', function($http, $scope, $location, $rootScope, $routeParams) {
	$scope.user = {};
	$scope.user.email = $routeParams.email;
	if($rootScope.user != null){
   	    $scope.user.email = $rootScope.user.email;
    }
	
    $scope.resetPassword = function () {
        $http({
            method: 'POST',
            url: '/users/forgot/',
            data: $.param({email: $scope.user.email}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
       }).then(function successCallback(response) {
    	    $scope.errorMessage = "Email sens to: " + $scope.user.email;
      		$location.path('/login');
        }, function errorCallback() {
            $scope.errorMessage = "Something wrong happen with the email: " + email;
        });
    };
});
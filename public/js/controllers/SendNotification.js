/**
 * Created by john on 3/27/17.
 */
angular.module('SendNotifCtrl', []).controller('NotificationController', function ($http, $scope, $location, $rootScope, $routeParams) {

    if (!$rootScope.user && $rootScope.user.role != "admin") {
        $location.path("/login");
    }
    $scope.message = "write your message here";
    $scope.name = $routeParams.name;
    $scope.id = $routeParams.id;


    $scope.sendNotification = function () {

        $http({
            method: 'POST',
            url: '/like/sendNotification/',
            data: $.param({serie_id: $scope.id , message: $scope.message}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {
            //  TODO  Change page + message success
            $location.path('/series');
        }, function errorCallback() {
            $scope.errorMessage = "message 123";
        });
    };


});
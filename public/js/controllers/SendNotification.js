/**
 * Created by john on 3/27/17.
 */
angular.module('SendNotifCtrl', []).controller('NotificationController', function ($http, $scope, $location, $rootScope, $routeParams) {

    if ((!$rootScope.user) || ($rootScope.user.role != "admin")) {
        $location.path("/login");
    }

    $scope.name = $routeParams.name;
    $scope.id = $routeParams.id;

    $scope.sendNotification = function () {
        $http({
            method: 'POST',
            url: '/likes/sendNotification/',
            data: $.param({serie_id: $scope.id, serie_name: $scope.name, message: $scope.message}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {
            $scope.messageClass = 'success';
            $scope.resultMessage = 'Notification was successfully sent.';
        }, function errorCallback(err) {
            $scope.messageClass = 'error';
            $scope.resultMessage = 'Unable to send the notification.';
        });
    };
});
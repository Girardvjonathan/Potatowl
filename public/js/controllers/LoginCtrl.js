/**
 * Created by john on 3/6/17.
 */
angular.module('loginCtrl')
    .controller('LoginController', function($scope, $auth) {
        console.log("hello im in login");
        $scope.authenticate = function(provider) {
            $auth.authenticate(provider);
        };

    });
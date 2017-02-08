angular.module('UserService', []).factory('User', ['$http', function($http) {

    return {
        get : function() {
            return $http.get('/api/user');
        },
        create : function(userData) {
            return $http.post('/api/user', userData);
        },

        delete : function(id) {
            return $http.delete('/api/user/' + id);
        }
    }

}]);

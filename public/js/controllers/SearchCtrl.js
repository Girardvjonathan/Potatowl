angular.module('SearchCtrl', []).controller('SearchController', function ($scope, $location, $filter) {

    var vm = this;

    vm.search = function () {
        if (!!vm.searchParams.primary_release_date && !!vm.searchParams.primary_release_date.gte) {
            vm.searchParams['primary_release_date.gte'] = $filter('date')(vm.searchParams.primary_release_date.gte, 'yyyy-mm-dd');
        }
        if (!!vm.searchParams.primary_release_date && !!vm.searchParams.primary_release_date.lte) {
            vm.searchParams['primary_release_date.lte'] = $filter('date')(vm.searchParams.primary_release_date.gte, 'yyyy-mm-dd');
        }

        delete vm.searchParams.primary_release_date;

        $location.path('/series').search(vm.searchParams);
    }


});
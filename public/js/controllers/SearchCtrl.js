angular.module('SearchCtrl', []).controller('SearchController', function ($scope, $location, $filter) {

    var vm = this;

    vm.search = function () {
        if(!!vm.searchParams){
            if (!!vm.searchParams.air_date && !!vm.searchParams.air_date.gte) {
                vm.searchParams['air_date.gte'] = vm.searchParams.air_date.gte;
            }
            if (!!vm.searchParams.air_date && !!vm.searchParams.air_date.lte) {
                vm.searchParams['air_date.lte'] = vm.searchParams.air_date.lte;
            }

            delete vm.searchParams.air_date;

            $location.path('/series').search(vm.searchParams);
        }

    }


});
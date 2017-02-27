

angular.module('app', ['ngRoute', 'appRoutes', 'MainCtrl', 'SeriesCtrl','SeriesService', 'SearchCtrl','stormpath', 'stormpath.templates'])
.config(function (STORMPATH_CONFIG) {

    // Specify your Client API domain here:

    STORMPATH_CONFIG.ENDPOINT_PREFIX = 'https://husky-spear.id.stormpath.io';
  });


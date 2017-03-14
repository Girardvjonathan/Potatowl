angular.module('app', ['ngRoute', 'appRoutes', 'MainCtrl', 'SeriesCtrl','SeriesService','satellizer'])
    .config(function($authProvider) {

        // $authProvider.facebook({
        //     clientId: 'Facebook App ID'
        // });
        //
        // // Optional: For client-side use (Implicit Grant), set responseType to 'token' (default: 'code')
        // $authProvider.facebook({
        //     clientId: 'Facebook App ID',
        //     responseType: 'token'
        // });

        $authProvider.google({
            clientId: '239913616155-tieqt533csgmens2kfr45ckaab3e6qo4.apps.googleusercontent.com'
        });

        // $authProvider.github({
        //     clientId: 'GitHub Client ID'
        // });
        //


    });

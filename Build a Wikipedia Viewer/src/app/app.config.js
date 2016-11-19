(function() {
  'use strict';

  angular.module('wikipediaApp');

  config.$inject = ['$locationProvider' ,'$routeProvider'];

  function config($locationProvider, $routeProvider) {

    // enable html for pushstate ('#' - less URLs)
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html'
      });
  }
})();
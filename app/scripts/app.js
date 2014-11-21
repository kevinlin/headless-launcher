'use strict';

/**
 * @ngdoc overview
 * @name headlessDockerApp
 * @description
 * # headlessDockerApp
 *
 * Main module of the application.
 */
angular
  .module('headlessDockerApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'interappMessaging',
    'dockingServer'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

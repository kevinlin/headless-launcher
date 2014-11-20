'use strict';

/**
 * @ngdoc function
 * @name headlessDockerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the headlessDockerApp
 */
angular.module('headlessDockerApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc function
 * @name headlessDockerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the headlessDockerApp
 */
angular.module('headlessDockerApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

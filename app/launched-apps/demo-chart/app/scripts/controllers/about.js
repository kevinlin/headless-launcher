/*global  d3*/
'use strict';

/**
 * @ngdoc function
 * @name demoChartApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the demoChartApp
 */
angular.module('demoChartApp')
  .controller('AboutCtrl', function ($scope, demoData, interappMessaging, charting) {
    $scope.model = {
      name: 'Apple'
    };

    interappMessaging.subscribe('*', 'currentCompany', function(msg){
      console.log(msg);
      $scope.model.name = msg.name;
      if (!$scope.$$phase) {
        $scope.$apply();
      }
    });

    charting.paintChart(d3.select('#equity-chart svg'));

  });

/*global fin, d3*/

'use strict';

/**
 * @ngdoc function
 * @name demoChartApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the demoChartApp
 */
angular.module('demoChartApp')
  .controller('MainCtrl', function ($scope, interappMessaging, dockingAdapter, charting) {

    // kicks off the docking adapter
    dockingAdapter.init(fin.desktop.Window.getCurrent(), fin, document);

    // if you want to make a frameless window, use the following to move it around
    // var mainWindow = fin.desktop.Window.getCurrent(),
    //     toolbar = document.getElementById('toolbar');

    // //call defineDraggableArea method with the toolbar.
    // mainWindow.defineDraggableArea(toolbar);



    var subscribeToUuid = 'headless-launcher',
        topic = 'demo',
        secretTopic = 'chart-demo:secret',
        chartSVG = d3.select('#equity-chart svg');

    //paint the chart initially
    charting.paintChart(chartSVG);

    $scope.model = {
      publicMessages: '',
      privateMessages: '',
      name: 'Apple',
      price: 500.45
    };

    interappMessaging
      .subscribe(subscribeToUuid, topic, function(message){
        $scope.model.publicMessages = message;
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      })
      .subscribe(subscribeToUuid, secretTopic, function(message){
        $scope.model.privateMessages = message;
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      })
      .subscribe('*', 'currentCompany', function(msg){
        $scope.model.name = msg.name;
        $scope.model.price = msg.price;
        charting.paintChart(chartSVG);
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      });



  });

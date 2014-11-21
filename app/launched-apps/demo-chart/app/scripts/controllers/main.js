/*global fin*/

'use strict';

/**
 * @ngdoc function
 * @name demoChartApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the demoChartApp
 */
angular.module('demoChartApp')
  .controller('MainCtrl', function ($scope, interappMessaging, dockingAdapter) {

    dockingAdapter.init(fin.desktop.Window.getCurrent(), fin, document);

    var subscribeToUuid = 'headless-launcher',
        topic = 'demo',
        secretTopic = 'demo:secret';

    $scope.model = {
      publicMessages: '',
      privateMessages: ''
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
      });

  });

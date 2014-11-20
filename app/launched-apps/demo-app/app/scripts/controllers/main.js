'use strict';

/**
 * @ngdoc function
 * @name demoAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the demoAppApp
 */
angular.module('demoAppApp')
  .controller('MainCtrl', function ($scope, interappMessaging) {

    var subscribeToUuid = 'headless-launcher',
        topic = 'demo';

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
      });

  });

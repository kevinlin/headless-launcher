/*global fin*/

'use strict';

/**
 * @ngdoc function
 * @name demoAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the demoAppApp
 */
angular.module('demoAppApp')
  .controller('MainCtrl', function ($scope, interappMessaging, dockingAdapter, subscriptions) {

    dockingAdapter.init(fin.desktop.Window.getCurrent(), fin, document);

    var subscribeToUuid = 'headless-launcher',
        topic = 'demo',
        secretTopic = 'app-demo:secret';

    $scope.model = {
      publicMessages: '',
      privateMessages: '',
      activeSymbol : 'APPL',
      tech: [{
        name: 'Apple',
        symbol: 'APPL',
        price: 500.45
      },{
        name: 'Google',
        symbol: 'GOOG',
        price: 400.45
      },{
        name: 'Facebook',
        symbol: 'FB',
        price: 100.45
      },{
        name: 'IBM',
        symbol: 'IBM',
        price: 40.45
      }],
      finance: [{
        name: 'Citi',
        symbol: 'C',
        price: 500.45
      },{
        name: 'Bank Of America',
        symbol: 'BOA',
        price: 400.45
      },{
        name: 'JP Morgan',
        symbol: 'JPM',
        price: 100.45
      },{
        name: 'Tullet Prebon',
        symbol: 'TP',
        price: 400.45
      }]
    };

    $scope.setOnClick = function(company){
      $scope.model.activeSymbol = company.symbol;
      interappMessaging
        .publish('currentCompany', company);
    };

    if (!subscriptions.hasSubscribed){
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

      subscriptions.hasSubscribed = true;
    }





  });

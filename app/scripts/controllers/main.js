'use strict';

/**
 * @ngdoc function
 * @name headlessDockerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the headlessDockerApp
 */
angular.module('headlessDockerApp')
  .controller('MainCtrl', function ($scope, appLauncher, interappMessaging, dockingServer) {

    console.log(dockingServer);

    var phrases = {
          public: [
            'I was written in agular',
            'I\'m a single page web app',
            'Theses apps were scaffolded with yeoman'
            ],
          app: [
          'This was sent via the inter app bus ',
          'The OpenFin JS adapter is not lazy loaded',
          'Windows are grouped with a call to joinGroup()'],
          chart: [
          'The chart shown here is done in d3.js',
          'The icons are from font awesome',
          'The chart is an svg element'
          ]
        },
        //return a random number between 0 and 10^exponent
        randTo = function(exponent){
          exponent = exponent || 1;
          return (Math.round(Math.random() * Math.pow(10, exponent)));
        },
        randomPhrase = function(arr){
          return arr[randTo(1) % arr.length];
        },
        topic = 'demo';

    // kick off the app launcher
    appLauncher.launchDefaultApps();

    var updateIntervalId = setInterval(function(){
      interappMessaging.publish(topic, randomPhrase(phrases.public));
      interappMessaging.publish( 'chart-demo:secret', 'demo-chart: '+randomPhrase(phrases.chart));
      interappMessaging.publish('app-demo:secret', 'demo-app: '+randomPhrase(phrases.app));
    }, 3000);

    $scope.$on('$destroy',function(){
      clearInterval(updateIntervalId);
    });
  });

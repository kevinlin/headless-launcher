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

    var phrases = [
        'I love HTML5',
        'JavaScript is cool!',
        'Tacos are best served hot!',
        'CSS3 is great!',
        'Dinosaurs ate all my tacos?'
        ],
        //return a random number between 0 and 10^exponent
        randTo = function(exponent){
          exponent = exponent || 1;
          return (Math.round(Math.random() * Math.pow(10, exponent)));
        },
        randomPhrase = function(){
          return phrases[randTo(1) % phrases.length];
        },
        topic = 'demo';

    appLauncher.launchDefaultApps();

    var updateIntervalId = setInterval(function(){
      interappMessaging.publish(topic, randomPhrase());
      interappMessaging.publish( 'chart-demo:secret', 'demo-chart: '+randomPhrase() + ' ' + randTo(10) );
      interappMessaging.publish('app-demo:secret', 'demo-app: '+randomPhrase() + ' ' + randTo(10));
    }, 3000);

    $scope.$on('$destroy',function(){
      clearInterval(updateIntervalId);
    });
  });

'use strict';

/**
 * @ngdoc function
 * @name headlessDockerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the headlessDockerApp
 */
angular.module('headlessDockerApp')
  .controller('MainCtrl', function ($scope, appLauncher, interappMessaging) {

    var phrases = [
        'I love HTML5',
        'JavaScript is cool!',
        'Tacos are best served hot!',
        'CSS3 is great!',
        'Dinosaurs ate all my tacos?'
        ],
        randomPhrase = function(){
          return phrases[(Math.round(Math.random() * 10)) % phrases.length];
        },
        topic = 'demo';

    appLauncher.launchDefaultApps();

    var updateIntervalId = setInterval(function(){
      interappMessaging.publish(topic, randomPhrase());
    }, 3000);

    $scope.$on('$destroy',function(){
      clearInterval(updateIntervalId);
    });
  });

/*global fin*/

'use strict';

/**
 * @ngdoc service
 * @name headlessDockerApp.appLauncher
 * @description
 * # appLauncher
 * Service in the headlessDockerApp.
 */
angular.module('headlessDockerApp')
  .service('appLauncher', function appLauncher() {
    var appsLaunched = false,
      defaultApps = [{
      url: 'http://local:9000/launched-apps/demo-app/dist/index.html',
      uuid: 'demo-app',
      applicationIcon: '',
      name: 'demo-app',
      mainWindowOptions: {
        defaultHeight: 600,
        defaultWidth: 800,
        defaultTop: 300,
        defaultLeft: 300,
        autoShow: true
      }
    },{
      url: 'http://local:9000/launched-apps/demo-chart/dist/index.html',
      uuid: 'demo-chart',
      applicationIcon: '',
      name: 'demo-chart',
      mainWindowOptions: {
        defaultHeight: 600,
        defaultWidth: 800,
        defaultTop: 300,
        defaultLeft: 300,
        autoShow: true
      }
    }];

    var launchDefaultApps = function(){
      if (appsLaunched) {
        console.log('apps previously launched');
        return;
      }
      defaultApps.forEach(function(appConfig){
        var app = new fin.desktop.Application(appConfig,
          function () {
            console.log('Application successfully created');
            app.run();
          },
          function () {
            console.log('Error creating application');
          });
      });

      appsLaunched = true;
    };

    return {
      launchDefaultApps: launchDefaultApps
    };
  });

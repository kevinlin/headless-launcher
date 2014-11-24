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
      url: 'launched-apps/demo-app/dist/index.html',
      uuid: 'demo-app',
      applicationIcon: '',
      name: 'demo-app',
      defaultHeight: 600,
      defaultWidth: 500,
      maxHeight: 600,
      maxWidth: 500,
      defaultTop: 300,
      defaultLeft: 300,
      autoShow: true,
      maximizable: false
    },{
      url: 'launched-apps/demo-chart/dist/index.html',
      uuid: 'demo-chart',
      applicationIcon: '',
      name: 'demo-chart',
      defaultHeight: 500,
      defaultWidth: 500,
      maxHeight: 500,
      maxWidth: 500,
      defaultTop: 300,
      defaultLeft: 300,
      autoShow: true,
      frame: true,
      maximizable: false
    }];

    var launchDefaultApps = function(){
      if (appsLaunched) {
        console.log('apps previously launched');
        return;
      }
      defaultApps.forEach(function(appConfig){
        new fin.desktop.Window(appConfig,
          function () {
            console.log('Child Window successfully created');
            //app.run();
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

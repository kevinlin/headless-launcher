/*global fin*/

'use strict';

/**
 * @ngdoc module
 * @name interappMessaging
 * @description
 * # interappMessaging
 * Module for interapp messaging in the headlessDockerApp.
 */
angular.module('interappMessaging', [])
  .service('interappMessaging', function interappMessaging() {

    var that = this;

    that.send = function(uuid, topic, message){
      fin.desktop.InterApplicationBus.send(uuid, topic, message);
      return that;
    };
    that.publish = function(topic, message){
      fin.desktop.InterApplicationBus.publish(topic,message);
      return that;
    };

    // the callback should take `message, senderUuid`
    that.subscribe = function(uuid, topic, callback){
      fin.desktop.InterApplicationBus.subscribe(uuid, topic, callback);
      return that;
    };

    that.listSubscribedApplications = function(){};
  });

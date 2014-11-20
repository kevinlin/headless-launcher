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

    //var that = this;

    var send = function(){};
    var publish = function(topic, message){
      fin.desktop.InterApplicationBus.publish(topic,message);
    };

    // the callback should take `message, senderUuid`
    var subscribe = function(uuid, topic, callback){
      fin.desktop.InterApplicationBus.subscribe(uuid, topic, callback);
    };

    var listSubscribedApplications = function(){};

    return {
      send: send,
      publish: publish,
      listSubscribedApplications: listSubscribedApplications,
      subscribe: subscribe
    };
  });

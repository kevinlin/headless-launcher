'use strict';

/**
 * @ngdoc service
 * @name demoAppApp.subscriptions
 * @description
 * # subscriptions
 * Service in the demoAppApp.
 */
angular.module('demoAppApp')
  .service('subscriptions', function subscriptions() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var hasSubscribed = false;

    return {
      hasSubscribed: hasSubscribed
    };

  });

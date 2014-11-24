'use strict';

describe('Service: subscriptions', function () {

  // load the service's module
  beforeEach(module('demoAppApp'));

  // instantiate service
  var subscriptions;
  beforeEach(inject(function (_subscriptions_) {
    subscriptions = _subscriptions_;
  }));

  it('should do something', function () {
    expect(!!subscriptions).toBe(true);
  });

});

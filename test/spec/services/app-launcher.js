'use strict';

describe('Service: appLauncher', function () {

  // load the service's module
  beforeEach(module('headlessDockerApp'));

  // instantiate service
  var appLauncher;
  beforeEach(inject(function (_appLauncher_) {
    appLauncher = _appLauncher_;
  }));

  it('should expose a launchDefaultApps function', function () {
    expect(appLauncher.launchDefaultApps).toBeDefined();
  });

});

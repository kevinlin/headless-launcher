'use strict';

describe('Service: charting', function () {

  // load the service's module
  beforeEach(module('demoChartApp'));

  // instantiate service
  var charting;
  beforeEach(inject(function (_charting_) {
    charting = _charting_;
  }));

  it('should do something', function () {
    expect(!!charting).toBe(true);
  });

});

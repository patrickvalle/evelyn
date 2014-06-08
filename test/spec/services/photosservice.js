'use strict';

describe('Service: Photosservice', function () {

  // load the service's module
  beforeEach(module('evelynApp'));

  // instantiate service
  var Photosservice;
  beforeEach(inject(function (_Photosservice_) {
    Photosservice = _Photosservice_;
  }));

  it('should do something', function () {
    expect(!!Photosservice).toBe(true);
  });

});

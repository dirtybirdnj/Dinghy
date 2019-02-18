'use strict';

var expect = require('expect.js');

describe('models/index', function () {
  it('returns the task model', function () {
    var models = require('../../models');
    expect(models.Event).to.be.ok();
  });

  it('returns the event model', function () {
    var models = require('../../models');
    expect(models.Event).to.be.ok();
  });
});

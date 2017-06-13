'use strict';

var app      = require('../../app');
var Bluebird = require('bluebird');
var expect   = require('expect.js');
var request  = require('supertest');

describe('user creation page', function () {
  before(function () {
      return require('../../models').sequelize.sync();
  });

  beforeEach(function () {
    this.models = require('../../models');

    return Bluebird.all([
      this.models.user_group.destroy({ truncate: true }),
      this.models.user.destroy({ truncate: true })
    ]);
  });

  it('loads correctly', function (done) {
    request(app).get('/').expect(200, done);
  });
});

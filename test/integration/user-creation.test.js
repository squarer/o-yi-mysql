'use strict'

const app = require('../../app')
const Bluebird = require('bluebird')
const expect = require('expect.js')
const request = require('supertest')

describe('user creation page', function() {
  before(function() {
    return require('../../models').sequelize.sync()
  })

  beforeEach(function() {
    this.models = require('../../models')

    return Bluebird.all([
      this.models.user_group.destroy({ truncate: true }),
      this.models.user.destroy({ truncate: true })
    ])
  })

  it('loads correctly', function(done) {
    request(app).get('/').expect(200, done)
  })
})

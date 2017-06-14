'use strict'

const expect = require('expect.js')

describe('models/index', function() {
  it('returns the userGroup model', function() {
    const models = require('../../models')
    expect(models.user_group).to.be.ok()
  })

  it('returns the user model', function() {
    const models = require('../../models')
    expect(models.user).to.be.ok()
  })
})

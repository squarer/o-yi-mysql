'use strict'

const expect = require('expect.js')

describe('models/task', function() {
  before(function() {
    return require('../../models').sequelize.sync()
  })

  beforeEach(function() {
    this.User = require('../../models').user
    this.UserGroup = require('../../models').user_group
  })

  describe('create', function() {
    it('creates a user group', function() {
      return this.User.create({ name: 'johndoe' }).bind(this).then(function(user) {
        return this.UserGroup.create({ name: 'a name', UserId: user.id }).then(function(userGroup) {
          expect(userGroup.name).to.equal('a name')
        })
      })
    })
  })
})

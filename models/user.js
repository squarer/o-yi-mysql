'use strict'

const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    user_group: { type: DataTypes.INTEGER, allowNull: false },
    is_valid: { type: DataTypes.BOOLEAN, defaultValue: 1 },
  })


  User.hook('beforeCreate', (user, options) => hashPassword(user))
  User.hook('beforeUpdate', (user, options) => hashPassword(user))

  function hashPassword(user) {
    return bcrypt.hash(user.password, saltRounds).then(function(hash) {
      user.password = hash
    })
  }

  return User
}

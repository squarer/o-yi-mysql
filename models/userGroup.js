'use strict'

module.exports = function(sequelize, DataTypes) {
  const UserGroup = sequelize.define('user_group', {
    name: { type: DataTypes.STRING, allowNull: false },
    is_valid: { type: DataTypes.BOOLEAN, defaultValue: 1 },
  })

  return UserGroup
}

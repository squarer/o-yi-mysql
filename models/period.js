'use strict'
module.exports = function(sequelize, DataTypes) {
  const period = sequelize.define('period', {
    result: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  })
  return period
}
'use strict';
module.exports = function(sequelize, DataTypes) {
  var period = sequelize.define('period', {
    result: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return period;
};
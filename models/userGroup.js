"use strict";

module.exports = function(sequelize, DataTypes) {
  var UserGroup = sequelize.define("user_group", {
    name: DataTypes.STRING,
    is_valid: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    },
  })

  return UserGroup;
};

"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    user_group: DataTypes.INTEGER,
    is_valid: DataTypes.BOOLEAN,
  })

  return User;
};

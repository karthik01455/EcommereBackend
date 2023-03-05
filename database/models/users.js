'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      models.Users.hasMany(models.Carts, { foreignKey: 'userId' });
    }
  }
  Users.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    static associate(models) {
      Carts.belongsTo(models.Users, { foreignKey: 'userId' });
      Carts.belongsTo(models.Products, { foreignKey: 'productId' });
    }
  }
  Carts.init({
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Carts',
  });
  return Carts;
};

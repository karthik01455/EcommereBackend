'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      Products.hasMany(models.Carts, { foreignKey: 'productId' });
    }
  }
  Products.init({
    productId:{
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      primaryKey:true
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    basePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    freeSidesLimit: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
    },
    extraSidePrice: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 2.0,
    },
    category: {
      type: DataTypes.ENUM("entradas", "truchas", "bebidas", "otros"),
      allowNull: false,
    },
    ingredientQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};

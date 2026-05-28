// TRUCHA FRITA
// 35 SOLES
// 3 GUARNICIONES GRATIS
// PRECIO EXTRA POR GUARNICION 2 SOLES
// ENTRADA
// CANTIDAD DE TRUCHAS 1

const { DataTypes } = require("sequelize");
const { SHOWTABLES } = require("sequelize/lib/query-types")

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
      defaultValue: 2.00,
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

// SIDE SON LAS GUARNICIONES
// EJ 
// ARROZ
// PAPA
// ENSALADA
// PLATANO FRITO 

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("side", {
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
  });
};

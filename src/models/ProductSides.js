const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("productSides", {
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};







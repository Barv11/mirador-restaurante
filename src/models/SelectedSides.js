const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("selectedSides", {
    isExtra: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tableNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ticketsApplied: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // La cajera lo llena al final
    },
    status: {
      type: DataTypes.ENUM(
        "abierto",
        "en cocina",
        "entregado",
        "pagado",
        "anulado",
      ),
      defaultValue: "abierto",
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    manualAdjustment: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    adjustmentReason: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        esObligatorioSiHayAjuste(value) {
          if (
            parseFloat(this.manualAdjustment) !== 0 &&
            (!value || value.trim() === "")
          ) {
            throw new Error(
              "Debe proporcionar un motivo para el ajuste manual.",
            );
          }
        },
      },
    },
  });
};
F;

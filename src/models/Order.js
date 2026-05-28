const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tableNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ticketsApplied: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // La cajera lo llena al final
    },
    orderStatus: {
      type: DataTypes.ENUM(
        "abierto",
        "en cocina",
        "entregado",
        "pagado",
        "cancelado",
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
          // Si el ajuste no es 0 y el motivo está vacío...
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

// Order.belongsTo(User);
// Product.belongsToMany(Side, { through: 'ProductSides' });
// Side.belongsToMany(Product, { through: 'ProductSides' });

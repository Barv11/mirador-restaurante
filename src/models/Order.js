// ORDER ES EL PEDIDO DE LA MESA
// UN EJ SERIA
// MESA 6
// 5 TICKETS TIENEN
// ESTADO DEL PEDIDO: EN COCINA
// TOTAL DE LA CUENTA
// AJUSTE MANUEL SI HUBO
// Y LA RAZON

// {
//   "id": 45,
//   "tableNumber": 4,
//   "status": "pagado",
//   "userId": 1,              // Atendido por Juan Pérez (User 1)
//   "ticketsApplied": 1,      // Entregó 1 ticket en caja (S/ 5.00 de descuento)
//   "manualAdjustment": -2.00, // Se le rebajaron S/ 2.00 por cortesía
//   "adjustmentReason": "Cliente frecuente, se redondeó la cuenta", // ¡Obligatorio!
//   "totalPrice": 63.00       // (S/ 70.00 del plato - S/ 5.00 ticket - S/ 2.00 ajuste)
// }

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
        "en_cocina",
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

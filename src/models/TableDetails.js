// TABLE DETAILS ES EL PUENTE QUE UNE ORDEN CON PRODUCTO
// SI LA MESA 5 -ORDER- PIDE 3 TRUCHAS FRITAS -PRODUCT- 
// LO Q ESCRIBIRIAN EN SU NOTA DE VENTA SERÍA EL TABLE DETAILS

// EJ DE OBJETO

// 5 TRUCHAS FRITAS
// 5 X 14 SUBTOTAL
// COMENTARIO POR SI QUIEREN LA TRUCHA MAS DORADA 

// {
//   "id": 500,
//   "orderId": 45,       // Vinculado a la orden de la Mesa 4
//   "productId": 10,     // Vinculado a la "Trucha Frita Especial"
//   "quantity": 2,
//   "subtotal": 70.00,
//   "comment": "Una de las truchas que sea bien frita, por favor.",
//   "selectedSides": [101] // Eligieron Yucas Doradas
// }

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("tableDetails", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      defaultValue: 1,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};

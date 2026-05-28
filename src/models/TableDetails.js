// TABLE DETAILS ES EL PUENTE QUE UNE ORDEN CON PRODUCTO
// SI LA MESA 5 -ORDER- PIDE 3 TRUCHAS FRITAS -PRODUCT- 
// LO Q ESCRIBIRIAN EN SU NOTA DE VENTA SERÍA EL TABLE DETAILS

// EJ DE OBJETO

// 5 TRUCHAS FRITAS
// 5 X 14 SUBTOTAL
// COMENTARIO POR SI QUIEREN LA TRUCHA MAS DORADA 

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

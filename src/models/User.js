// PERSONAL MESERO COCINERO CAJERO 

// {
//   "id": 1,
//   "name": "Juan Pérez",
//   "email": "juan.mesero@mirador.com",
//   "role": "mesero",
//   "isActive": true
// }

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'mesera', 'caja'),
      defaultValue: 'mesera'
    }
  });
};
require("dotenv").config();
const { Sequelize } = require("sequelize");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, PORT } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  },
);

// En tu server.js o app.js donde sincronizas Sequelize:
sequelize
  .sync({ alter: true }) // 👈 Ajusta las tablas existentes con los nuevos campos y ENUMs
  .then(() => console.log("Base de datos sincronizada con éxito. 🚀"));

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};

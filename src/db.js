require("dotenv").config();
require("./models/index.js");

const { Sequelize } = require("sequelize");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, PORT } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  },
);

sequelize
  .sync({ alter: true })
  .then(() => console.log("Base de datos sincronizada con éxito. 🚀"))
  .catch((err) => console.error("Error al sincronizar:", err));

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};

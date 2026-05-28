// const Order = require("./Order");
// const Product = require("./Product");
// const Side = require("./Side");
// const TableDetails = require("./TableDetails");
// const User = require("./User");

const { User, Order, TableDetails, Product, Side } = sequelize.models;

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(TableDetails, { onDelete: "CASCADE" });
TableDetails.belongsTo(Order);

Product.hasMany(TableDetails);
TableDetails.belongsTo(Product);

Product.belongsToMany(Side, { through: ProductSides });
Side.belongsToMany(Product, { through: ProductSides });

TableDetails.belongsToMany(Side, { through: SelectedSides });
Side.belongsToMany(TableDetails, { through: SelectedSides });

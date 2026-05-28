const Order = require("./Order");
const Product = require("./Product");
const ProductSides = require("./ProductSides");
const SelectedSides = require("./SelectedSides");
const Side = require("./Side");
const TableDetails = require("./TableDetails");
const User = require("./User");

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(TableDetails);
TableDetails.belongsTo(Order);

Product.hasMany(TableDetails);
TableDetails.belongsTo(Product);

Product.belongsToMany(Side, { through: ProductSides });
Side.belongsToMany(Product, { through: ProductSides });

TableDetails.belongsToMany(Side, { through: SelectedSides });
Side.belongsToMany(TableDetails, { through: SelectedSides });



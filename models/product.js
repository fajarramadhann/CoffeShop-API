import { Sequelize, DataTypes } from "sequelize";
import database from "../database/database.js";

const Products = database.define("products", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },  
  imageUrl: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
},
{
  freezeTableName:true
});

export default Products;
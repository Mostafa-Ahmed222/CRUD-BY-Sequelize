import { DataTypes } from "sequelize";
import { sequelize } from "../DB/connection.js";

export const productModle = sequelize.define("product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deletedAt: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
import { DataTypes } from "sequelize";
import { sequelize } from "../DB/connection.js";

export const userModel = sequelize.define('User', {
    userName : {
        type: DataTypes.STRING, // 255 default length
        allowNull : false
    },
    age: {
        type : DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type: DataTypes.STRING,
        allowNull : false
    },
    phone: {
        type: DataTypes.STRING(11)
    },
    confirmEmail: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})
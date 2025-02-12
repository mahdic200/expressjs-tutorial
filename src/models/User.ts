import { Sequelize, DataType, Model, DataTypes } from 'sequelize';
import sequelize from "@/db";

class User extends Model {};

User.init(
    {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "User",
    },
);

export default User;

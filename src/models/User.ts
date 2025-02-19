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
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        created_at: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.TIME,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
        createdAt: "created_at",
        updatedAt: "updated_at",
        /* enabling soft deletes */
        paranoid: true,
        deletedAt: "deleted_at",
    },
);

export default User;

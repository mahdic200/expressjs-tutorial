import { Sequelize } from "sequelize";
import dotenv from "dotenv";
// Initializing dotenv
dotenv.config({ path: './.env'});

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME || 'dbname', DB_USERNAME || 'dbusername', DB_PASSWORD || '', {
    host: DB_HOST || 'localhost',
    dialect: "mysql",
});

export default sequelize;

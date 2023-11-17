import { Sequelize } from "sequelize";

const db = new Sequelize({
    host: process.env.DB_HOST,
    port: '3306',
    username: 'root',
    password: 'jarssdev',
    database: 'coffe-shop',
    port: process.env.PORT,
    dialect: "mysql"
});

export default db;
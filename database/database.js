import { Sequelize } from "sequelize";

const db = new Sequelize({
    host: process.env.DB_HOST,
    username: 'root',
    password: '',
    database: 'coffe-shop',
    port: process.env.PORT,
    dialect: "mysql"
});

export default db;
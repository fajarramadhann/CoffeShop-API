import { Sequelize } from "sequelize";

const database = new Sequelize({
    username: 'root',
    password: '',
    database: 'coffe-shop',
    port: 3306,
    dialect: "mysql"
});

export default database;
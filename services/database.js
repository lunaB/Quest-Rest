const mysql = require('mysql2/promise')
const dotenv = require('dotenv');
dotenv.config()

const database_config = {
    'host' : process.env.DB_HOST,
    'port' : process.env.DB_PORT,
    'user' : process.env.DB_USER,
    'password' : process.env.DB_PASSWORD,
    'database' : process.env.DB_NAME,
    'connectionLimit' : 5
}
const connection = mysql.createPool(database_config)

module.exports = connection;
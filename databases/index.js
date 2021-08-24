// require Sequelize
const { Sequelize } = require('sequelize');
// require config
const config = require('config');

// create new connection to DB
const connectDB = new Sequelize(
    config.get('database.dbname'),
    config.get('database.username'),
    config.get('database.password'),
    {
        dialect: config.get('database.options.dialect'),
        host: config.get('database.options.host')
    }
);

// exports connectDB
module.exports = connectDB;
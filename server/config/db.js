const { Sequelize } = require('sequelize')
require('dotenv').config()

const connection = new Sequelize('fms', 'root', process.env.SQL_DB_Password, {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = { connection }
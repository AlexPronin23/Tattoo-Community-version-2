require('dotenv').config()

const Sequelize = require('sequelize')

const host = process.env.DB_HOST
const db = process.env.DB_DATABASE
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD

const sequelize = new Sequelize(db,user,password, {
    dialect: 'mysql',
    host:host
})

module.exports = sequelize

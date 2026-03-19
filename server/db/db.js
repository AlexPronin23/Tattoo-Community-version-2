const db = require('mysql2')
require('dotenv').config({path: '../.env'})

const pool = db.createPool({

    connectionLimit:5,

    host:process.env.DB_HOST,

    user:process.env.DB_USER,

    password:process.env.DB_PASSWORD,

    database:process.env.DB_DATABASE

}).promise()


module.exports = pool
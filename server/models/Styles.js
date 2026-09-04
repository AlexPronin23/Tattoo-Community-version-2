const {DataTypes} = require('sequelize')
const sequelize = require('../db/db')

const Styles = sequelize.define('tb_styles', {
}, {
    tableName:'tb_styles',
    timestamps:false
})

module.exports = Styles


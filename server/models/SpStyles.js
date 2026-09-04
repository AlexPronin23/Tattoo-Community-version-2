const {DataTypes} = require('sequelize')
const sequelize = require('../db/db')

const SpStyles = sequelize.define('sp_styles', {
    style_id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name: {
        type: DataTypes.STRING,
    }
}, {
    tableName:'sp_styles',
    timestamps:false
})

module.exports = SpStyles
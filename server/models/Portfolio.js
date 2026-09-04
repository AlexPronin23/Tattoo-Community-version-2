const {DataTypes} = require('sequelize')
const sequelize = require('../db/db')

const Portfolio = sequelize.define('tb_portfolio', {
    portfolio_id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    img:{
        type:DataTypes.BLOB,
        allowNull:false
    }
}, {
    tableName:'tb_portfolio',
    timestamps:false
})

module.exports = Portfolio
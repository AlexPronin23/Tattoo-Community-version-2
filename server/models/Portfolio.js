const {DataTypes} = require('sequelize')
const sequelize = require('../db/db')

const Portfolio = sequelize.define('tb_portfolio', {
    portfolio_id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    img:{
        type:DataTypes.TEXT('long'),
        allowNull:false
    }
}, {
    tableName:'tb_portfolio',
    timestamps:false
})

module.exports = Portfolio
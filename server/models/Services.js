const { DataTypes } = require( 'sequelize')
const sequelize = require('../db/db')

const Services = sequelize.define('tb_services', {
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    service_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    servicePrice: {
        type:DataTypes.INTEGER,
        allowNull:false
    }
    
}, {
    tableName:'tb_services',
    timestamps:false
})

module.exports = Services
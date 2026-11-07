const {DataTypes} = require('sequelize')
const sequelize = require('../db/db')

const SpServices = sequelize.define('sp_services', {
    service_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name: {
        type:DataTypes.STRING
    }
}, {
    tableName:'sp_services',
    timestamps:false
}
)

module.exports = SpServices
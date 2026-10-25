const {DataTypes} = require('sequelize')
const sequilize = require('../db/db')

const Orders = sequilize.define('tb_orders', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    client_id: {
        type:  DataTypes.INTEGER,
        allowNull: false
    },
    master_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull:false
    },
    dataOrder: {
        type:DataTypes.DATE,
    },
    timeOrder: {
        type: DataTypes.TIME
    },
    price:{
        type: DataTypes.INTEGER
    },
    message: {
        type: DataTypes.STRING
    },
    status: {
        type:DataTypes.STRING
    }

}, {
    tableName: 'tb_orders',
    timestamps: false
}
)

module.exports = Orders
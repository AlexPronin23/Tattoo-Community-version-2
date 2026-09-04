const {DataTypes} = require('sequelize')
const sequelize = require('../db/db')

const TattooMasters = require('./TattooMasters')
const Portfolio = require('./Portfolio')

const Users = sequelize.define('tb_users', {
    user_id: {
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull:false
    },
    password: {
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.BOOLEAN
    }
}, {
    tableName:'tb_users',
    timestamps:false
})

Users.hasOne(TattooMasters, {
    foreignKey:'user_id',
    onDelete:'cascade'
})
Users.hasMany(Portfolio, {
    foreignKey:'user_id',
    onDelete:'cascade'
})

module.exports = Users
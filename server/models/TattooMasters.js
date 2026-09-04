const {DataTypes}  = require('sequelize')
const sequelize = require('../db/db')

const Styles = require('./Styles')
const SpStyles = require('./SpStyles')

const TattooMasters = sequelize.define('tb_info', {
    user_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    first_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    last_name: {
        type:DataTypes.STRING,
        allowNull:false
    },
    experience:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    tattooSalon: {
        type:DataTypes.STRING,
        allowNull:false
    },
    isColored: {
        type:DataTypes.BOOLEAN
    },
    isAtHome: {
        type:DataTypes.BOOLEAN
    }
}, {
    tableName:'tb_info',
    timestamps:false
})

TattooMasters.belongsToMany(SpStyles, {
    through: Styles,
    foreignKey:'user_id',
    otherKey:'style_id'
})

SpStyles.belongsToMany(TattooMasters, {
    through: Styles,
    foreignKey: 'style_id',
    otherKey: 'user_id'
})

module.exports = TattooMasters
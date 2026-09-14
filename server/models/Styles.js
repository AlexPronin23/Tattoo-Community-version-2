const {DataTypes} = require('sequelize')
const sequelize = require('../db/db')

const Styles = sequelize.define('tb_styles', {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    style_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    tableName:'tb_styles',
    timestamps:false
})

module.exports = Styles


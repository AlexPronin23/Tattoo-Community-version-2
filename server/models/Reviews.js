const {DataTypes} = require('sequelize')
const sequelize = require('../db/db')

const Reviews = sequelize.define('tb_reviews', {
    review_id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
    },
    client_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    master_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    message:{
        type:DataTypes.STRING,
    },
    rate:{
        type:DataTypes.INTEGER
    },
    dateReview:{
        type:DataTypes.DATEONLY
    },
    timeReview:{
        type:DataTypes.TIME
    }
},
 {
    tableName:'tb_reviews',
    timestamps:false
 })

 module.exports = Reviews
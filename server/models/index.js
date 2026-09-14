// const sequelize = require('../db/db');
const Users = require('./Users');
const TattooMasters = require('./TattooMasters');
const SpStyles = require('./SpStyles');
const Styles = require('./Styles');
const Portfolio = require('./Portfolio');

Users.hasOne(TattooMasters, { foreignKey: 'user_id', onDelete: 'CASCADE' });
TattooMasters.belongsTo(Users, { foreignKey: 'user_id' });

Users.hasMany(Portfolio, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Portfolio.belongsTo(Users, { foreignKey: 'user_id' });

TattooMasters.belongsToMany(SpStyles, {
    through: Styles, foreignKey: 'user_id', otherKey: 'style_id', as: 'styles'
});
SpStyles.belongsToMany(TattooMasters, {
    through: Styles, foreignKey: 'style_id', otherKey: 'user_id', as: 'masters'
});

module.exports = {Users, TattooMasters, SpStyles, Styles, Portfolio };
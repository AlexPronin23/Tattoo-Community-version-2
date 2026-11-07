// const sequelize = require('../db/db');
const Users = require('./Users');
const TattooMasters = require('./TattooMasters');
const SpStyles = require('./SpStyles');
const Styles = require('./Styles');
const Portfolio = require('./Portfolio');
const Orders = require('./Orders')
const SpServices = require('./SpServices')
const Services = require('./Services')

// Users <-> TattooMasters (1 to 1)
Users.hasOne(TattooMasters, { foreignKey: 'user_id', onDelete: 'CASCADE',as:'masterInfo' });
TattooMasters.belongsTo(Users, { foreignKey: 'user_id' });

// Users <-> Portfolio (1 to Many)
Users.hasMany(Portfolio, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Portfolio.belongsTo(Users, { foreignKey: 'user_id' });

// TattooMasters <-> Styles <-> SpStyles (Many to Many)
TattooMasters.belongsToMany(SpStyles, {
    through: Styles, foreignKey: 'user_id', otherKey: 'style_id', as: 'styles'
});
SpStyles.belongsToMany(TattooMasters, {
    through: Styles, foreignKey: 'style_id', otherKey: 'user_id', as: 'masters'
});

// Users <-> Orders (1 to Many)

//Client
Users.hasMany(Orders, {
    foreignKey: 'client_id',
    as: 'clientOrders', // Псевдоним для запросов
    onDelete: 'CASCADE'
});
Orders.belongsTo(Users, {
    foreignKey: 'client_id',
    as: 'client' // По этому псевдониму будем доставать инфу о клиенте
});

// 2. Мастер (один пользователь может иметь много заказов как мастер)
Users.hasMany(Orders, {
    foreignKey: 'master_id',
    as: 'masterOrders', // Псевдоним для запросов
    onDelete: 'CASCADE'
});
Orders.belongsTo(Users, {
    foreignKey: 'master_id',
    as: 'master' // По этому псевдониму будем доставать инфу о мастере
});

// TattooMaster <-> Services <-> SpServices (Many to Many)
TattooMasters.belongsToMany(SpServices, {
    through:Services, foreignKey:'user_id', otherKey:'service_id', as:'services'
})
SpServices.belongsToMany(TattooMasters,{
    through:Services, foreignKey:'service_id', otherKey:'user_id', as:'masters'
})

// Services <-> SpServices (1 to Many)
Services.belongsTo(SpServices, { 
    foreignKey: 'service_id', 
    as: 'masterServicesInfo' 
});

SpServices.hasMany(Services, { 
    foreignKey: 'service_id' 
});


module.exports = {Users, TattooMasters, SpStyles, Styles, Portfolio ,Orders,SpServices,Services};
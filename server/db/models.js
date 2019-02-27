const Sequelize = require('sequelize');
const sequelize = require('./config.js');

const Company = sequelize.define('company', {
  ticker: Sequelize.STRING,
  name: Sequelize.STRING
});

const DailyPrice = sequelize.define('dailyprice', {
  date: Sequelize.DATE,
  price: Sequelize.DECIMAL(10, 2)
});

const FiveMinPrice = sequelize.define('fiveminprice', {
  date: Sequelize.DATE,
  price: Sequelize.DECIMAL(10, 2)
});

Company.hasMany(DailyPrice);
DailyPrice.belongsTo(Company);

Company.hasMany(FiveMinPrice);
FiveMinPrice.belongsTo(Company);

module.exports = { Company, DailyPrice, FiveMinPrice, sequelize };

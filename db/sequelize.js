const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('proxicommission', 'root', '', {
  host: 'localhost',
  dialect: 'mysql2',
  logging: true
});

module.exports = sequelize
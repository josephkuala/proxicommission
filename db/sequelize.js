const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('proxicommission', 'root', 'emrg@2022', {
  host: 'mariadb',
  dialect: 'mariadb',
  logging: true
});

module.exports = sequelize
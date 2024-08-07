const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('proxicommission', 'root', 'emrg@2022', {
  host: '172.19.0.39',
  port: 3307,
  dialect: 'mariadb',
  logging: true
});

module.exports = sequelize
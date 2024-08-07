// db/config.js
module.exports = {
  development: {
    username: 'root',
    password: 'emrg@2022',
    database: 'proxicommission',
    host: '172.19.0.39',
    port: '3307',
    dialect: 'mariadb',
    logging: true
  },
  test: {
    username: 'root',
    password: 'emrg@2022',
    database: 'proxicommission_test',
    host: '172.19.0.39',
    port: '3307',
    dialect: 'mariadb',
    logging: false
  },
  production: {
    username: 'root',
    password: 'emrg@2022',
    database: 'proxicommission_prod',
    host: '172.19.0.39',
    port: '3307',
    dialect: 'mariadb',
    logging: false
  }
};

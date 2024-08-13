// db/config.js
module.exports = {
  development: {
    username: 'root',
    password: 'emrg@2022',
    database: 'proxicommission',
    host: 'mariadb',
    dialect: 'mariadb',
    logging: true
  },
  test: {
    username: 'root',
    password: 'emrg@2022',
    database: 'proxicommission_test',
    host: 'mariadb',
    dialect: 'mariadb',
    logging: false
  },
  production: {
    username: 'root',
    password: 'emrg@2022',
    database: 'proxicommission_prod',
    host: 'mariadb',
    dialect: 'mariadb',
    logging: false
  }
};

// db/config.js
module.exports = {
  development: {
    username: 'root',
    password: '',
    database: 'proxicommission',
    host: 'localhost',
    dialect: 'mysql2',
    logging: true
  },
  test: {
    username: 'root',
    password: '',
    database: 'proxicommission_test',
    host: 'localhost',
    dialect: 'mysql2',
    logging: false
  },
  production: {
    username: 'root',
    password: '',
    database: 'proxicommission_prod',
    host: 'localhost',
    dialect: 'mysql2',
    logging: false
  }
};

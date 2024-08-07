const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize'); // Assurez-vous d'avoir un lien vers votre configuration de base de données.

class Fond extends Model {}

Fond.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  sequelize,
  modelName: 'Fond'
});

module.exports = Fond;
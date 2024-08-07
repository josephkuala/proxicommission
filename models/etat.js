const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize'); // Assurez-vous d'avoir un lien vers votre configuration de base de données.

class Etat extends Model {}

Etat.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom_etat: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Etat'
});

module.exports = Etat;
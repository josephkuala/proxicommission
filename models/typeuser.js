const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize'); // Assurez-vous d'avoir un lien vers votre configuration de base de données.

class TypeUser extends Model {}

TypeUser.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pourcentage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'TypeUser'
});

module.exports = TypeUser;
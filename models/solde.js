const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize'); // Assurez-vous d'avoir un lien vers votre configuration de base de données.

class Solde extends Model {}

Solde.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  solde: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
      isFloat: { msg: 'Utilisez uniquement des nombres entiers pour le solde.' },
      min: {
        args: [0],
        msg: 'Le solde doivent être supérieurs ou égales à 1.'
      },
      notNull: { msg: 'Le solde est une propriété requise.'}
    }
  },
  medecinId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Medecins',
      key: 'id',
    }
  },
}, {
  sequelize,
  modelName: 'Solde'
});

module.exports = Solde;
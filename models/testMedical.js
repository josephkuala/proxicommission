const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize'); // Assurez-vous d'avoir un lien vers votre configuration de base de données.

class TestMedical extends Model {}

TestMedical.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'nom',
      msg: 'Le nom est déjà pris.'
    },
    validate: {
      len: {
        args: [3,999],
        msg: 'Le nom du test doit contenir au minimum caractères.'
      },
      notEmpty: { msg: 'Le nom du test ne peut pas être vide.' },
      notNull: { msg: 'Le nom du test est une propriété requise.'}
    }
  },
  montant: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
      isFloat: { msg: 'Utilisez uniquement des nombres entiers pour le montant.' },
      min: {
        args: [1],
        msg: 'Le montant doivent être supérieurs ou égales à 1.'
      },
      max: {
        args: [999],
        msg: 'Le montant doivent être inférieures ou égales à 999.'
      },
      notNull: { msg: 'Le montant est une propriété requise.'}
    }
  },
}, {
  sequelize,
  modelName: 'TestMedical'
});

module.exports = TestMedical;
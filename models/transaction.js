const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize'); // Assurez-vous d'avoir un lien vers votre configuration de base de données.

class Transaction extends Model {}

Transaction.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  code: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING(12), // Défini comme une chaîne de caractères de longueur maximale 12
    allowNull: false,
    validate: {
        is: /^[0-9]+$/i, // Validation regex pour s'assurer que le téléphone ne contient que des chiffres
        len: [0, 12] // Assure que la longueur est entre 0 et 12
    }
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  provider_reference: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  medecinId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Medecins',
      key: 'id',
    }
  },
  etatId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Etats',
      key: 'id',
    }
  },
}, {
  sequelize,
  modelName: 'Transaction',
});

module.exports = Transaction;
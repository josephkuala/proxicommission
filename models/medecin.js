const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize'); // Assurez-vous d'avoir un lien vers votre configuration de base de données.

class Medecin extends Model {}

Medecin.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3,999],
        msg: 'Le nom doit contenir au minimum caractères.'
      },
      notEmpty: { msg: 'Le nom ne peut pas être vide.' },
      notNull: { msg: 'Le nom est une propriété requise.'}
    }
  },
  postnom: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [3,999],
        msg: 'Le nom doit contenir au minimum caractères.'
      },
    }
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3,999],
        msg: 'Le prenom doit contenir au minimum caractères.'
      },
      notEmpty: { msg: 'Le prenom ne peut pas être vide.' },
      notNull: { msg: 'Le prenom est une propriété requise.'}
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: { msg: 'Utilisez uniquement un adresse email valid.' },
      notEmpty: { msg: 'L\'email ne peut pas être vide.' },
      notNull: { msg: 'L\'email est une propriété requise.'}
    }
  },
  typeuser: {
    type: DataTypes.INTEGER,
    references: {
      model: 'TypeUsers',
      key: 'id',
    }
  },
  username: {
    type: DataTypes.STRING,
    unique: {
      msg: 'Le nom est déjà pris.'
    }
  },
  password: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'Medecin',
});

module.exports = Medecin;
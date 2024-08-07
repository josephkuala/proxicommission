const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');


class Gain extends Model {}

Gain.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  gain: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
      isFloat: { msg: 'Utilisez uniquement des nombres entiers pour le gain.' },
      min: {
        args: [1],
        msg: 'Le gain doivent être supérieurs ou égales à 1.'
      },
      notNull: { msg: 'Le gain est une propriété requise.'}
    }
  },
  medecinId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Medecins',
      key: 'id',
    }
  },
  patientId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Patients',
      key: 'id',
    }
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [3,999],
        msg: 'La references doit contenir au minimum caractères.'
      },
    }
  },
}, {
  sequelize,
  modelName: 'Gain'
});

module.exports = Gain;




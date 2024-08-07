const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');


class GainTest extends Model {}

GainTest.init({
    GainId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  TestMedicalId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
}, {
  sequelize,
  modelName: 'GainTest'
});

module.exports = GainTest;




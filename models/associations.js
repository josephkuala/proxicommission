const TestMedical = require('./testMedical');
const Medecin = require('./medecin');
const Gain = require('./gain');
const Solde = require('./solde');
const GainTest = require('./gainTest');
const Transaction = require('./transaction');
const Patient = require('./patient');
const Etat = require('./etat');
const StatusCompte = require('./accountState');
const Fond = require('./fond');
const HistoriqueFond = require('./historiquefond');
const TypeUser = require('./typeuser');

Gain.belongsTo(Medecin, {
  foreignKey: 'medecinId'
});
Gain.belongsTo(Patient, {
  foreignKey: 'patientId'
});
Gain.belongsToMany(TestMedical, {
  through: 'GainTest' 
});

Solde.belongsTo(Medecin, {
  foreignKey: 'medecinId',
});

Transaction.belongsTo(Medecin, {
  foreignKey: 'medecinId'
});
Medecin.hasMany(Gain, {
  foreignKey: 'medecinId',
});
Medecin.hasMany(Transaction, {
  foreignKey: 'medecinId',
});
/*TestMedical.hasMany(Gain, {
  foreignKey: 'testMedId',
  as: 'gain'
});*/

Medecin.hasOne(Solde, {
  foreignKey: 'medecinId',
});

Medecin.belongsTo(TypeUser, {
  foreignKey: 'typeuser',
});

Patient.hasMany(Gain, {
  foreignKey: 'patientId',
});

TypeUser.hasMany(Medecin, {
  foreignKey: 'typeuser',
});


Transaction.belongsTo(Etat, {
  foreignKey: 'etatId'
});

Etat.hasMany(Transaction, {
  foreignKey: 'etatId'
});
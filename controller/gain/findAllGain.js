const Gain = require('../../models/gain');
const TestMedical = require('../../models/testMedical');
const GainTest = require('../../models/gainTest');
const Medecin = require('../../models/medecin');
const Patient = require('../../models/patient'); // Assurez-vous d'importer votre modèle Patient

exports.findAllGain = async (req, res) => {
   await Gain.findAll({
    attributes: { exclude: ['medecinId', 'patientId'] },
    include: [
      {
        model: Medecin,
        attributes: ['id', 'nom', 'postnom', 'prenom'] // Spécifiez les attributs que vous souhaitez du médecin
      },
      {
        model: Patient, // Inclure le modèle Patient
        attributes: ['id', 'nom','postnom', 'prenom'] // Spécifiez les attributs souhaités du patient
      },
      {
        model: TestMedical,
        through: { attributes: [] } // Gardez les tests médicaux comme vous les avez déjà
      }
    ]
   })
    .then(gains => {
      const message = 'La liste des gains a bien été récupérée.';
      res.json({ message, data: gains });
    })
    .catch(error => {
      const message = `La liste des gains n'a pas pu être récupérée. Réessayez dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
}

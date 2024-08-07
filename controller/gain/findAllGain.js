const Gain = require('../../models/gain');
const TestMedical = require('../../models/testMedical');
const GainTest = require('../../models/gainTest');
const Medecin = require('../../models/medecin');

exports.findAllGain = async (req, res) => {
   await Gain.findAll({
    include: [
      {
        model: Medecin,
        attributes: ['nom']
      },
      {
        model: TestMedical,
        through: {attributes:[]}
      }
    ]
   })
    .then(gains => {
      const message = 'La liste des gains a bien été récupéré.'
      res.json({ message, data: gains })
    })
    .catch(error => {
      const message = `La liste des gains n'a pas pu être récupéré. 
                        Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    });
    
}
const Gain = require('../../models/gain');
const TestMedical = require('../../models/testMedical');
const GainTest = require('../../models/gainTest');
const Medecin = require('../../models/medecin');

exports.findGainById = async (req, res) => {
   await Gain.findByPk(
    req.params.id,
    {
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
      const message = 'Les gains du medecin ont bien été récupéré.'
      res.json({ message, data: gains })
    })
    .catch(error => {
      const message = `Les gains n'a pas pu être récupéré. 
                        Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    });
    
}
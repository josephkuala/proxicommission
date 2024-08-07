const Medecin = require('../../models/medecin');

exports.findAllMedecin = async (req, res) => {
   await Medecin.findAll(
      { order: ['nom'] }
    )
    .then(medecins => {
      const message = 'La liste des medecins a bien été récupéré.'
      res.json({ message, data: medecins })
    })
    .catch(error => {
      const message = `La liste des medecins n'a pas pu être récupéré. 
                        Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    });
    
}
const Medecin = require('../../models/medecin');

exports.findMedById = async (req, res) => {
  await Medecin.findByPk(req.params.id)
    .then(medecin => {
      if(medecin === null) {
        const message = `Le medecin demandé n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      const message = 'Un medecin a bien été trouvé.'
      res.json(medecin)
    })
    .catch(error => {
      const message = `Le medecin n'a pas pu être récupéré. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    });
    
}
const Medecin = require('../../models/medecin');

exports.deleteMed = async (req, res) => {
  Medecin.findByPk(req.params.id)
    .then(medecin => {        
      if(medecin === null) {
        const message = `Le medecin demandé n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      return Medecin.destroy({ where: { id: medecin.id } })
      .then(_ => {
        const message = `Le medecin avec l'identifiant n°${medecin.id} a bien été supprimé.`
        res.json({message, data: medecin })
      })
    })
    .catch(error => {
      const message = `Le medecin n'a pas pu être supprimé. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
}
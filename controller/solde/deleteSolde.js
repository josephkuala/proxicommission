const Solde = require('../../models/solde');

exports.deleteSolde = async (req, res) => {
  Solde.findByPk(req.params.id)
    .then(solde => {        
      if(solde === null) {
        const message = `Le solde demandé n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      return Solde.destroy({ where: { id: solde.id } })
      .then(_ => {
        const message = `Le solde avec l'identifiant n°${solde.id} a bien été supprimé.`
        res.json({message, data: solde })
      })
    })
    .catch(error => {
      const message = `Le solde n'a pas pu être supprimé. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
}
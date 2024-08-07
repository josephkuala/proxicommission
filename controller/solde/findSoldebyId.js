const Solde = require('../../models/solde');

exports.findSoldeById = async (req, res) => {
  await Solde.findByPk(req.params.id)
    .then(solde => {
      if(solde === null) {
        const message = `Le solde demandé n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      const message = 'Un solde a bien été trouvé.'
      res.json({ message, data: solde })
    })
    .catch(error => {
      const message = `Le solde n'a pas pu être récupéré. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    });
    
}
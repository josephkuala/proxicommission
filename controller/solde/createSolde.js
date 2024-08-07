const Solde = require('../../models/solde');

exports.createSolde = async (req, res) => {
  await Solde.create(req.body)
    .then(solde => {
      const message = `Le solde a bien été crée.`
      res.json({ message, data: solde })
    })
    .catch(error => {
      if(error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: 'error.message', data: error });
      }
      const message = `Le solde n'a pas pu être ajouté. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
    
}
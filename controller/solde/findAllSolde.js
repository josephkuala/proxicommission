const Solde = require('../../models/solde');

exports.findAllSolde = async (req, res) => {
   await Solde.findAll()
    .then(soldes => {
      const message = 'La liste des soldes a bien été récupéré.'
      res.json({ message, data: soldes })
    })
    .catch(error => {
      const message = `La liste des soldes n'a pas pu être récupéré. 
                        Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    });
    
}
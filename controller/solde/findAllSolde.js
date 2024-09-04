const Solde = require('../../models/solde');
const Medecin = require('../../models/medecin');

exports.findAllSolde = async (req, res) => {
   await Solde.findAll({
    attributes: { exclude: ['medecinId'] },
    include: [
      {
        model: Medecin,
        attributes: ['id', 'nom', 'postnom', 'prenom'] // Spécifiez les attributs que vous souhaitez du médecin
      },
    ]
   })
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
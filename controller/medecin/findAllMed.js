const Medecin = require('../../models/medecin');
const TypeUser = require('../../models/typeuser');

exports.findAllMedecin = async (req, res) => {
   await Medecin.findAll(
      { order: ['nom'],
        attributes: { exclude: ['typeuser'] },
        include: [
          {
            model: TypeUser,
            attributes: ['nom', 'pourcentage'] // Spécifiez les attributs que vous souhaitez du médecin
          },
        ]
      }
      
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
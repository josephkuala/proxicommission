const TypeUser = require('../../models/typeuser');

exports.findAllTypeUser = async (req, res) => {
   await TypeUser.findAll(
      { order: ['nom'] }
    )
    .then(typeusers => {
      const message = 'La liste des types user a bien été récupéré.'
      res.json({ message, data: typeusers })
    })
    .catch(error => {
      const message = `La liste des types user n'a pas pu être récupéré. 
                        Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    });
    
}